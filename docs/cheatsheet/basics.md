---
title: Javascript Basics - Javascript Cheatsheet
description: The basics of Javascript. We all need to start somewhere, so how about doing it here.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Basics
</base-title>

We all need to start somewhere, so how about doing it here.

<base-disclaimer>
  <base-disclaimer-title>
    From the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript">MDN web docs</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
   JavaScript is a scripting language that allows you to implement complex features on web pages: displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. You can bet that JavaScript is probably involved.
  </base-disclaimer-content>
</base-disclaimer>

## Data Types

JavaScript provides seven different data types:

| Data Types  | Examples                                                              |
| ----------- | --------------------------------------------------------------------- |
| `undefined` | A variable that has not been assigned a value is of type `undefined`. |
| `null`      | no value.                                                             |
| `string`    | `'a', 'aa', 'aaa', 'Hello!', '11 cats'`                               |
| `number`    | `12, -1, 0.4`                                                         |
| `boolean`   | `true, false`                                                         |
| `object`    | A collection of properties.                                           |
| `symbol`    | Represents a unique identifier.                                       |

## Variables

In JavaScript, you can declare variables using `var`, `let`, and `const` keywords. Here's what you need to know about each:

1. `var`: This is the oldest way to declare variables. It's not used as much in modern JavaScript, but it's still important to understand. Variables declared with var are function-scoped, meaning they are only available within the function they're declared in.

    ```javascript
    var name = "John"
    ```

2. `let`: This is a newer way to declare variables, introduced in ES6 (ES2015). Variables declared with let are block-scoped, meaning they are only available within the block they're declared in.

    ```javascript
    let age = 25;
    ```

3. `const`: Also introduced in ES6, const is used to declare constants, i.e., variables that cannot be reassigned. Like let, const is also block-scoped.

    ```javascript
    const pi = 3.14159;
    ```

### Here are some important points to remember:

- Variables declared with `var` are hoisted to the top of their scope. This means they can be used before they're declared. This is not the case with `let` and `const`.
- `let` and `const` create variables that are block-scoped, meaning they exist only within the block they're declared in. This is different from `var`, which creates function-scoped variables.
- Variables declared with `const` cannot be reassigned. However, if the variable is an object or an array, its properties or elements can still be modified.

## Comments

In JavaScript, you can write comments in your code to explain what it does, leave notes for yourself or others, or to prevent execution of code. There are two types of comments in JavaScript:

### Single-line comments

These are created using two forward slashes `//`. Everything to the right of `//` on the same line is a comment.

```javascript
// This is a single-line comment
```

### Multi-line comments

These are created using `/*` to start the comment, and `*/` to end the comment. Everything between `/*` and `*/`, including multiple lines, is a comment.

```javascript
/*
This is a multi-line comment
It can span multiple lines
*/
```

<base-warning>
  <base-warning-title>
    Comments and the Interpreter
  </base-warning-title>
  <base-warning-content>
    Comments are ignored by the JavaScript interpreter and do not affect the execution of the code. They are purely for humans to read.
  </base-warning-content>
</base-warning>

## The console.log Function

The `console.log()` function in JavaScript is used to print output to the console. This can be very useful for debugging, as it allows you to output the values of variables at different points in your code, or to output messages that help you understand the flow of execution in your code.

```javascript
console.log("Hello, World!"); // prints "Hello, World!" to the console
```

You can print the value of variables:

```javascript
let a = 1;
console.log(a); // prints the value of a (1) to the console
```

You can also print multiple values at once by separating them with commas:

```javascript
let a = 1;
let b = 2;
console.log(a, b); // prints "1 2" to the console
```

<base-warning>
  <base-warning-title>
    console.log and the Interpreter
  </base-warning-title>
  <base-warning-content>
    Note that `console.log()` does not affect the execution of your code. It's purely for outputting information to the console.
  </base-warning-content>
</base-warning>

