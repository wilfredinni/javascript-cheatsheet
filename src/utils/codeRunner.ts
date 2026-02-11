const workerSource = String.raw`
const timers = new Map();
const counts = new Map();

const send = (type, payload) => {
  self.postMessage({ type, payload });
};

const safeString = (value) => {
  if (typeof value === 'string') {
    return value;
  }
  if (value instanceof Error) {
    return value.stack || value.message || String(value);
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch (error) {
    return String(value);
  }
};

const console = {
  log: (...args) => send('log', args),
  info: (...args) => send('info', args),
  warn: (...args) => send('warn', args),
  error: (...args) => send('error', args),
  table: (...args) => send('table', args),
  group: (label = 'Group') => send('group', [label]),
  groupEnd: () => send('groupEnd', []),
  count: (label = 'default') => {
    const current = counts.get(label) || 0;
    const next = current + 1;
    counts.set(label, next);
    send('count', [label, next]);
  },
  time: (label = 'default') => {
    timers.set(label, Date.now());
  },
  timeEnd: (label = 'default') => {
    const start = timers.get(label);
    if (start == null) {
      send('warn', [
        'No such label: ' + label,
      ]);
      return;
    }
    const duration = Date.now() - start;
    timers.delete(label);
    send('time', [label, duration]);
  },
  trace: (...args) => {
    const stack = new Error().stack || '';
    send('trace', [args, stack]);
  },
  assert: (condition, ...args) => {
    if (!condition) {
      send('assert', args.length ? args : ['Assertion failed']);
    }
  },
  clear: () => send('clear', []),
};

const instrumentCode = (source) => {
  const lines = source.split('\n');
  let inBlockComment = false;
  let lastNonEmpty = '';

  const shouldSkipTrace = (trimmed) => {
    if (!trimmed) return true;
    if (trimmed.startsWith('//')) return true;
    if (trimmed.startsWith('/*')) return true;
    if (trimmed.startsWith('*') && inBlockComment) return true;
    if (/^[}\]]([,;])?$/.test(trimmed)) return true;
    if (
      /^[\w$"'\[]/.test(trimmed) &&
      trimmed.includes(':') &&
      !/^case\b/.test(trimmed) &&
      !/^default\b/.test(trimmed) &&
      !trimmed.includes('?')
    ) {
      return true;
    }
    if (/^(else|catch|finally|case|default)\b/.test(trimmed)) return true;
    if (/^\}\s*(else|catch|finally)\b/.test(trimmed)) return true;
    if (/^while\b/.test(trimmed) && /^\}/.test(lastNonEmpty)) return true;
    return false;
  };

  const result = lines.map((line, index) => {
    const trimmed = line.trim();
    const lineNumber = index + 1;

    if (inBlockComment) {
      if (trimmed.includes('*/')) {
        inBlockComment = false;
      }
      if (trimmed) {
        lastNonEmpty = trimmed;
      }
      return line;
    }

    if (trimmed.startsWith('/*')) {
      if (!trimmed.includes('*/')) {
        inBlockComment = true;
      }
      lastNonEmpty = trimmed;
      return line;
    }

    if (shouldSkipTrace(trimmed)) {
      if (trimmed) {
        lastNonEmpty = trimmed;
      }
      return line;
    }

    lastNonEmpty = trimmed;
    return '__trace(' + lineNumber + ');\n' + line;
  });

  return result.join('\n');
};

self.onmessage = (event) => {
  const { code } = event.data || {};
  const traceEvents = [];
  const __trace = (line) => {
    traceEvents.push({ line, time: Date.now(), step: traceEvents.length + 1 });
  };

  const execute = (fn, allowViz) => {
    try {
      fn(console, __trace);
      if (allowViz && traceEvents.length) {
        send('viz', traceEvents);
      }
      return null;
    } catch (error) {
      return error;
    }
  };

  let instrumentedCode = instrumentCode(code || '');
  let fn;
  let usedInstrumentation = false;
  let vizStatus = { enabled: false, reason: null };
  try {
    fn = new Function(
      'console',
      '__trace',
      '"use strict";\n' + instrumentedCode,
    );
    usedInstrumentation = true;
    vizStatus = { enabled: true, reason: null };
  } catch (error) {
    instrumentedCode = null;
    vizStatus = {
      enabled: false,
      reason: 'Visualization skipped for this snippet.',
    };
    try {
      fn = new Function('console', '__trace', '"use strict";\n' + code);
    } catch (innerError) {
      send('error', [safeString(innerError)]);
      send('viz-status', vizStatus);
      send('done', []);
      return;
    }
  }

  let execError = execute(fn, usedInstrumentation);

  if (execError && usedInstrumentation) {
    traceEvents.length = 0;
    usedInstrumentation = false;
    vizStatus = {
      enabled: false,
      reason: 'Visualization disabled for this snippet.',
    };
    try {
      fn = new Function('console', '__trace', '"use strict";\n' + code);
      execError = execute(fn, false);
    } catch (innerError) {
      execError = execError || innerError;
    }
  }

  if (execError) {
    send('error', [safeString(execError)]);
  }
  send('viz-status', vizStatus);
  send('done', []);
};
`

export function createRunnerWorker() {
  const blob = new Blob([workerSource], { type: 'text/javascript' })
  const url = URL.createObjectURL(blob)
  const worker = new Worker(url)
  URL.revokeObjectURL(url)
  return worker
}

export function getNodeOnlyReason(code: string) {
  const matches = [
    { regex: /\brequire\s*\(/, reason: 'Uses require()' },
    {
      regex:
        /\bimport\s+[^\n]+\s+from\s+['"](fs|path|os|crypto|http|https|net|tls|child_process|zlib|stream|worker_threads|url)['"]/i,
      reason: 'Uses Node.js modules',
    },
    { regex: /\bprocess\./, reason: 'Uses Node.js process' },
    { regex: /\b__dirname\b|\b__filename\b/, reason: 'Uses Node.js globals' },
  ]

  for (const match of matches) {
    if (match.regex.test(code)) {
      return match.reason
    }
  }

  return null
}
