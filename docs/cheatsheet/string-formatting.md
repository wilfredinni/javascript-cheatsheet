---
title: Javascript String Formatting - Javascript Cheatsheet
description: In JavaScript, string formatting can be achieved in several ways. One common method is using template literals.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript String Formatting
</base-title>

## Template Literals

**Template literals** (also known as template strings) are string literals allowing embedded expressions. You can use multi-line strings and string interpolation features with them. They were introduced in ECMAScript 6.

<base-disclaimer>
  <base-disclaimer-title>
    From the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals" target="_blank">MDN Web Docs</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
    Template literals are literals delimited with backtick (`) characters, allowing for multi-line strings, string interpolation with embedded expressions, and special constructs called tagged templates.
  </base-disclaimer-content>
</base-disclaimer>

Template literals can contain placeholders, indicated by the dollar sign and curly braces (`${expression}`). The expressions in the placeholders and the text between them get passed to a function.

```javascript
let name = "John";
let age = 30;
let greeting = `Hello, my name is ${name} and I am ${age} years old.`;

console.log(greeting); // Outputs: "Hello, my name is John and I am 30 years old."
```

Here, `name` and `age` are variables. The template literal is defined using backticks, and the variables are embedded in the string using `${}` syntax. The resulting string is stored in the `greeting` variable and then logged to the console.

## String Concatenation

String concatenation is the operation of joining two or more strings together. This can be achieved using the `+` operator or the `concat` method.

### Using the `+` Operator

Here's an example of string concatenation using the `+` operator:

```javascript
let str1 = "Hello, ";
let str2 = "World!";
let result = str1 + str2;

console.log(result); // Outputs: "Hello, World!"
```

`str1` and `str2` are strings. The `+` operator is used to concatenate `str1` and `str2` together. The resulting string is stored in the `result` variable and then logged to the console.

### Using the `concat` Method

Here's an example of string concatenation using the `concat` method:

```javascript
let str1 = "Hello, ";
let str2 = "World!";
let result = str1.concat(str2);

console.log(result); // Outputs: "Hello, World!"
```

`str1` and `str2` are strings. The `concat` method is called on `str1` with `str2` as the argument, concatenating `str1` and `str2` together. The resulting string is stored in the `result` variable and then logged to the console.

## The recommended way

The recommended way to format strings in JavaScript is by using Template Literals (Template Strings) introduced in ECMAScript 6 (ES6). Template literals allow you to embed expressions, create multi-line strings, and use string interpolation features, making them a powerful tool for string formatting.
