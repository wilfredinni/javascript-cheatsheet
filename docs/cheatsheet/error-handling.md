---
title: Javascript Error Handling - Javascript Cheatsheet
description: Error handling in programming is the process of responding to and managing errors that occur during the execution of a program.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Error Handling
</base-title>

Error handling in programming is the process of responding to and managing errors that occur during the execution of a program.

<base-disclaimer>
  <base-disclaimer-title>
    Why is Error Handling Important?
  </base-disclaimer-title>
  <base-disclaimer-content>
    Error handling is important because it helps to ensure that your program can continue to function (or fail gracefully) even when unexpected conditions occur.
  </base-disclaimer-content>
</base-disclaimer>

Errors can occur for a variety of reasons, such as user input that the program doesn't know how to handle, system resources being unavailable, or unexpected conditions in the program's logic.


## Try...Catch Statements

Error handling is typically done using `try...catch` statements:

```javascript
try {
  // Code that may throw an error
} catch (error) {
  // Code to handle the error
}
```

In the `try` block, you write the code that may throw an error. In the `catch` block, you write the code to handle the error. The error object that is passed to the `catch` block contains information about the error, such as its name and message.

```javascript
try {
  let x = y; // y is not defined, so an error is thrown
} catch (error) {
  console.log(error.message); // Outputs: "y is not defined"
}
```

**y** is not defined, so when we try to assign its value to **x**, an error is thrown. The catch block catches this error and logs its message to the console.

## Finally Block

There's also a `finally` block that can be added after `catch`, which will be executed regardless of whether an error was thrown or caught:

```javascript
try {
  // Code that may throw an error
} catch (error) {
  // Code to handle the error
} finally {
  // Code to be executed regardless of an error
}
```

## Throwing Errors

Throwing errors in programming is a way to handle unexpected or exceptional conditions. It allows a function to indicate that it is unable to proceed with its normal execution, and gives control back to the part of the program that called the function.

In many programming languages, you can "throw" an error (or "raise" an exception) with a `throw` statement.

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}
```

If the function `divide` is called with the second argument as `0`, it will throw an error. The calling code can then "catch" this error and handle it appropriately.

## Custom Error Types

Creating custom error types can be useful when you want to throw and catch errors that represent specific conditions in your program. This allows you to handle different types of errors in different ways.

Here's an example of how you can define and use a custom error type:

```javascript
class DivisionByZeroError extends Error {
  constructor() {
    super("Division by zero is not allowed");
    this.name = "DivisionByZeroError";
  }
}

function divide(a, b) {
  if (b === 0) {
    throw new DivisionByZeroError();
  }
  return a / b;
}

try {
  console.log(divide(1, 0));
} catch (error) {
  if (error instanceof DivisionByZeroError) {
    console.log(error.message);
  } else {
    throw error;
  }
}
```

`DivisionByZeroError` is a custom error type that extends the built-in `Error` type. When `divide` is called with `0` as the second argument, it throws a `DivisionByZeroError`. The `try`/`catch` block then catches this error and handles it by logging the error message to the console.

## Error Propagation

Error propagation refers to the process by which errors (or exceptions) are passed up the call stack from where they were thrown until they are caught by an appropriate error handler.

In many programming languages, when an error is thrown and not immediately caught within the same function or method, it propagates up to the calling function. This continues until the error is either caught and handled, or it reaches the top level of the call stack, at which point the program typically crashes with an unhandled exception error.

Here's an example in JavaScript:

```javascript
function function1() {
  function2();
}

function function2() {
  throw new Error("An error occurred");
}

try {
  function1();
} catch (error) {
  console.log("Caught an error: " + error.message);
}
```

`function2` throws an error. Since it's not caught within `function2`, it propagates up to `function1`. Again, it's not caught there, so it propagates up to the top level, where it is finally caught in the `try`/`catch` block.

## Asynchronous Error Handling

Asynchronous error handling is a bit different from synchronous error handling. In asynchronous programming, because the operations are not blocking, errors can't be caught with a simple `try`/`catch` block. 

There are a few ways to handle errors in asynchronous code:

1. **Callbacks**: The most traditional way is to use a callback function that takes an error as its first argument.

```javascript
fs.readFile('nonexistent-file.txt', function(err, data) {
  if (err) {
    console.error('There was an error reading the file!', err);
    return;
  }
  // Otherwise handle the data
});
```

2. **Promises**: Promises have `.catch` method to handle any errors that might have occurred in the promise chain.

```javascript
doSomething()
  .then(result => doSomethingElse(result))
  .then(newResult => doAnotherThing(newResult))
  .catch(error => console.error(error));
```

3. **Async/Await**: With async/await, you can use a `try`/`catch` block to handle errors, which can make your asynchronous code look and behave a little more like synchronous code.

```javascript
async function doSomethingAsync() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    await doAnotherThing(newResult);
  } catch (error) {
    console.error(error);
  }
}
```

In all these cases, the key is to make sure that any function that might throw an error is properly handled to prevent the error from propagating up and crashing your program.
