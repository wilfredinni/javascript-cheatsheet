---
title: Async and Await - Javascript Cheatsheet
description: Learn async and await from scratch with simple examples, common mistakes, and when to run tasks in parallel.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Async and Await
</base-title>

Async and await make asynchronous code easier to read by letting you write it like normal, step-by-step code.

<base-disclaimer>
  <base-disclaimer-title>
    From the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">MDN web docs</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
    An async function is a function declared with the async keyword. Async functions always return a promise and can use await inside their body.
  </base-disclaimer-content>
</base-disclaimer>

## The Problem They Solve

When code uses promises directly, it can get noisy:

```javascript
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

wait(500)
  .then(() => "Done")
  .then((message) => console.log(message));
```

With async and await, the same thing looks simpler:

```javascript
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  await wait(500);
  console.log("Done");
}

run();
```

## What `async` Means

- `async` turns a function into an asynchronous one.
- An `async` function always returns a promise.

```javascript
async function getNumber() {
  return 7;
}

getNumber().then((value) => console.log(value));
```

Even though `return 7` looks normal, the caller receives a promise.

## What `await` Does

- `await` pauses the function until the promise settles.
- You can only use `await` inside an `async` function (or top-level `await` in ES modules).

```javascript
async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const user = await response.json();
  return user.name;
}

getUser().then((name) => console.log(name));
```

## Error Handling with `try` / `catch`

Use `try` / `catch` around awaited calls to handle errors.

```javascript
async function loadUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    console.log(user.name);
  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
}

loadUser();
```

## Sequential vs Parallel

`await` runs things one after another. That can be slow when tasks do not depend on each other.

```javascript
async function sequential() {
  const a = await wait(300);
  const b = await wait(300);
  console.log("Sequential done", a, b);
}

async function parallel() {
  const [a, b] = await Promise.all([wait(300), wait(300)]);
  console.log("Parallel done", a, b);
}

sequential();
parallel();
```

## Common Beginner Mistakes

1. **Forgetting to `await`**

```javascript
async function load() {
  const result = fetch("https://jsonplaceholder.typicode.com/todos/1");
  console.log(result); // Promise, not the data
}

load();
```

Fix it by adding `await`:

```javascript
async function load() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log(data);
}

load();
```

2. **Using `await` outside `async`**

```javascript
const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
```

This causes a syntax error in normal scripts. Put it inside an `async` function or use an ES module.

3. **Not returning the promise**

```javascript run
async function getData() {
  fetch("https://jsonplaceholder.typicode.com/todos/1");
}

getData().then((value) => console.log(value));
```

This logs `undefined` because nothing is returned. Return the awaited result:

```javascript run
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return response.json();
}

getData().then((data) => console.log(data));
```

## Quick Summary

- `async` makes a function return a promise.
- `await` pauses inside an `async` function until a promise resolves.
- Use `try` / `catch` to handle errors.
- Use `Promise.all` when you can run tasks in parallel.
