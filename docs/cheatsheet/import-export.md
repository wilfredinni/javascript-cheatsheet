---
title: Javascript Import and Export - Javascript Cheatsheet
description: Learn how to structure code with ES modules using import and export.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Import and Export
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules">JavaScript modules</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
    Modules let you split code across files, export the parts you want to share, and import them where you need them.
  </base-disclaimer-content>
</base-disclaimer>

## What is a Module

A module is just a JavaScript file that shares code with other files. You share with `export` and bring it in with `import`.

In the browser, you must mark your script as a module so the imports work.

```html file=index.html
<script type="module" src="./main.js"></script>
```

## Named Exports

Named exports let you share more than one thing from a file. Each export has a name.

```javascript file=math.js
export const pi = 3.14159;
export function add(a, b) {
  return a + b;
}
```

## Named Imports

Import only what you need by name. The names must match the exported names.

```javascript file=main.js
import { pi, add } from "./math.js";

console.log(pi);
console.log(add(2, 3));
```

## Default Export

A file can have one default export. This is helpful when there is one main thing to share.

```javascript file=logger.js
export default function log(message) {
  console.log(message);
}
```

## Default Import

Default imports do not use braces, and you can choose any name you like.

```javascript file=main.js
import log from "./logger.js";

log("Hello!");
```

## Renaming Imports and Exports

Use `as` to avoid name clashes or make the name clearer in your file.

```javascript file=math.js
export { add as sum };
```

```javascript file=main.js
import { sum as addNumbers } from "./math.js";
```

## Namespace Imports

Import everything as a single object. This is useful when a module exports many values.

```javascript file=main.js
import * as math from "./math.js";

console.log(math.pi);
console.log(math.add(2, 3));
```

## Re-Exporting

Re-export to create one public file that gathers exports from many files.

```javascript file=index.js
export { add, pi } from "./math.js";
export { default as log } from "./logger.js";
```

## Side-Effect Imports

Import a module just to run its top-level code (for example, polyfills or global setup).

```javascript file=main.js
import "./setup.js";
```

## Dynamic Import

Load modules on demand. This helps performance by loading code only when needed. It returns a promise.

```javascript file=main.js
async function loadChart() {
  const module = await import("./chart.js");
  module.renderChart();
}
```

## CommonJS require (Node)

Before ES modules, Node.js used CommonJS. You might still see it in older projects. It is different from `import`/`export`.

```javascript file=math.js
const pi = 3.14159;
function add(a, b) {
  return a + b;
}

module.exports = { pi, add };
```

```javascript file=main.js
const { pi, add } = require("./math.js");

console.log(pi);
console.log(add(2, 3));
```

## Common Mistakes

These are the most common issues beginners run into:

- Missing file extensions in the browser. Use `./file.js` instead of `./file`.
- Wrong path. `./` means "same folder", `../` means "one folder up".
- Mixing named and default imports. Named imports use braces, default imports do not.
- Forgetting `type="module"` in the HTML script tag.

<base-warning>
  <base-warning-title>
    File Extensions in the Browser
  </base-warning-title>
  <base-warning-content>
    In browsers, use the full file name with extension (for example, "./math.js"). Bundlers may allow extension-less imports.
  </base-warning-content>
</base-warning>
