const workerSource = `
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

self.onmessage = (event) => {
  const { code } = event.data || {};
  try {
    const fn = new Function('console', '"use strict";\\n' + code);
    fn(console);
    send('done', []);
  } catch (error) {
    send('error', [safeString(error)]);
    send('done', []);
  }
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
