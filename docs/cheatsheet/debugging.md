---
title: Javascript Debugging - Javascript Cheatsheet
description:  JavaScript, running in a Node.js environment can interact with the file system using the built-in fs module.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Debugging
</base-title>

Debugging is the process of identifying, isolating, and fixing problems or "bugs" in computer code. It involves running the program and using various tools and techniques to understand why the program is not behaving as expected

## console.log

The `console.log()` function is quite versatile and can be used in several ways to aid in debugging and understanding your code. Here are some examples:

1. **Logging variable values**: The most common use of `console.log()` is to print the value of a variable.

```javascript
let x = 10;
console.log(x);  // Outputs: 10
```

2. **Logging multiple values**: You can pass multiple arguments to `console.log()` to print them all.

```javascript
let x = 10;
let y = 20;
console.log(x, y);  // Outputs: 10 20
```

3. **String substitution**: `console.log()` supports string substitution, similar to `printf` in C.

```javascript
let name = 'Alice';
console.log('Hello, %s', name);  // Outputs: Hello, Alice
```

4. **Logging objects**: You can log entire objects, and `console.log()` will format them nicely.

```javascript
let obj = {a: 1, b: 2, c: 3};
console.log(obj);  // Outputs: { a: 1, b: 2, c: 3 }
```

5. **Logging arrays**: Similarly, you can log entire arrays.

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr);  // Outputs: [ 1, 2, 3, 4, 5 ]
```

Remember, excessive use of `console.log()` can slow down your application, especially when logging large objects or arrays. It's a good practice to remove or comment out `console.log()` statements once you're done debugging.

<base-warning>
  <base-warning-title>
    Caution
  </base-warning-title>
  <base-warning-content>
    Remember to remove or comment out the `console.log()` statements once you're done debugging, as they can slow down your code and you typically don't want to output debug information in a production environment.
  </base-warning-content>
</base-warning>

## console.info

The `console.info()` method is used to output an informational message to the Web Console. In many environments, it behaves the same way as `console.log()`.

Here's an example of how you can use `console.info()`:

```javascript
console.info('This is an informational message');
```

When you run this code, it will output the string "This is an informational message" to the console.

In some browsers, the output of `console.info()` might be styled differently from `console.log()` to indicate that it's an informational message. However, in many environments, including Node.js and many modern browsers, `console.info()` and `console.log()` behave the same way.

## console.warn

Used to output a warning message to the Web Console. It's similar to `console.log()`, but in many environments, the output is styled differently to indicate that it's a warning.

```javascript
console.warn('This is a warning message');
```

When you run this code, it will output the string "This is a warning message" to the console. In many browsers, this message will be displayed with a yellow warning icon and a yellow text background to distinguish it from regular console log messages.

This method is useful for logging messages that indicate potential problems in your code that aren't severe enough to throw an error.

## console.error

Output an error message to the Web Console. In some environments, the output is styled differently to indicate that it's an error.

Here's an example of how you can use `console.error()`:

```javascript
console.error('This is an error message');
```

Useful for logging error messages that help in debugging your code. It does not throw an error or stop the execution of the function. It simply outputs the message to the console.

## console.table

Display data in a table format in the console. It's particularly useful when working with arrays or objects.

```javascript
let people = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 30 }
];

console.table(people);
```

It will output a table to the console that looks something like this:

```
(index) | name     | age
-------------------------
0       | Alice    | 20
1       | Bob      | 25
2       | Charlie  | 30
```

The `console.table()` method can make it easier to visualize and understand complex data structures. It automatically provides an index column, and uses the keys of your objects as the column names.

## console.group

I group together related log messages. When you call `console.group()`, it starts a new group in the console. All subsequent console messages will be added to this group, until you call `console.groupEnd()`, which ends the group.

```javascript
console.group('Processing array');
console.log('Array has', array.length, 'elements');
console.log('First element:', array[0]);
console.groupEnd();
```

When you run this code, it will output something like this to the console:

```
Processing array
  Array has 5 elements
  First element: 1
```

The messages inside the group are indented to show that they're part of the group. This can make it easier to understand the flow of complex code with many log messages.

You can also create nested groups by calling `console.group()` multiple times before calling `console.groupEnd()`. Each call to `console.groupEnd()` ends the most recently started group that hasn't already been ended.

## console.count

Log the number of times that this particular call to `console.count()` has been invoked. It takes an optional argument label. If provided, `console.count()` outputs the count and label. If label is omitted, the console uses 'default' as the label.

```javascript
for(let i = 0; i < 5; i++) {
  console.count('Loop counter');
}
```

It will output something like this to the console:

```
Loop counter: 1
Loop counter: 2
Loop counter: 3
Loop counter: 4
Loop counter: 5
```

This method is useful when you want to know how many times a particular part of your code has been executed.

## console.time

`console.time` is used in conjunction with `console.timeEnd()` to measure the time taken by a block of code to execute. It's a simple and effective way to benchmark your code.

```javascript
console.time('Array processing');

// Some array processing to measure
let array = [];
for(let i = 0; i < 1000000; i++) {
  array.push(i);
}

console.timeEnd('Array processing');
```

The output will look like this:

```
Array processing: 123.456ms
```

The string you pass to `console.time()` and `console.timeEnd()` is used as the label for the timer. The timer starts when you call `console.time()` and stops when you call `console.timeEnd()`. The elapsed time, in milliseconds, is then output to the console.

## console.trace

`console.trace()` is used to output a stack trace to the console. A stack trace is a report of the active stack frames at a certain point in time during the execution of a program. It can be very useful for debugging, as it shows the execution path your code has taken to reach a certain point.

```javascript
function firstFunction() {
  secondFunction();
}

function secondFunction() {
  thirdFunction();
}

function thirdFunction() {
  console.trace();
}

firstFunction();
```

When you run this code, it will output a stack trace to the console that shows that `firstFunction` called `secondFunction`, which called `thirdFunction`, which is where the trace was output.

The output will look something like this:

```
thirdFunction
secondFunction
firstFunction
```

This shows the order in which the functions were called. The function at the top of the list is the current function (where `console.trace()` was called), and the function at the bottom is the first function that was called.

## console.assert

This method is used to write a message to the console if the assertion is false. If the assertion is true, nothing happens.

```javascript
console.assert(1 === 2, '1 is not equal to 2');
```

When you run this code, it will output the string "1 is not equal to 2" to the console, because the assertion (1 === 2) is false. If the assertion was true, `console.assert()` would do nothing.

## Debugger Statement

The `debugger` statement is used to pause execution and start a debugging session. When the JavaScript interpreter encounters a `debugger` statement, and if the developer console is open in your browser or if the code is running in a debugging environment (like Node.js with a debugger attached), the execution of the code will pause at the `debugger` statement.

Here's an example of how you can use the `debugger` statement:

```javascript
function potentiallyBuggyFunction() {
  let obj = { a: 1, b: 2 };
s
  // Insert debugger statement
  debugger;

  // Rest of the function
  obj.c = obj.a + obj.b;
  return obj.c;
}

potentiallyBuggyFunction();
```

When you run this code with the developer console open, the execution will pause at the `debugger` statement. You can then step through the rest of the function, inspect variables, and so on.

<base-warning>
  <base-warning-title>
    Caution
  </base-warning-title>
  <base-warning-content>
    Remember to remove `debugger` statements once you're done debugging, as leaving them in can cause your code to pause unexpectedly if run with a debugger attached.
  </base-warning-content>
</base-warning>

## Unit Testing

Unit testing is a software testing method where individual units of source code—sets of one or more computer program modules together with associated control data, usage procedures, and operating procedures—are tested to determine whether they are fit for use.

In the context of programming, a unit could be an entire module, but it is more commonly an individual function or procedure. The purpose of unit testing is to isolate each part of the program and verify that the individual parts are working correctly.

Here's an example of a simple unit test using the Jest testing framework:

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

The `sum` function is being tested to ensure that it correctly adds two numbers together. The `test` function is used to define a test, and the `expect` and `toBe` functions are used to define what the expected output should be.

Unit tests are typically automated and run by a CI/CD system whenever changes are made to the codebase, ensuring that regressions are caught and fixed as early as possible.
