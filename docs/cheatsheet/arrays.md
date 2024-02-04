---
title: Javascript Arrays - Javascript Cheatsheet
description: An array in JavaScript is a high-level, list-like object that is used to store multiple values in a single variable.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Arrays
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    From the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank">MDN Web Docs</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
  The Array object, as with arrays in other programming languages, enables storing a collection of multiple items under a single variable name, and has members for performing common array operations.
  </base-disclaimer-content>
</base-disclaimer>

An array in JavaScript is a high-level, list-like object that is used to store multiple values in a single variable. Each value (also called an element) in an array has a numeric position, known as its index, and it can contain data of any type—numbers, strings, booleans, functions, objects, and even other arrays:

```javascript
let fruits = ['apple', 'banana', 'cherry'];
```

## Array Declaration

In JavaScript, an array can be declared in several ways:

1. **Array literal**: This is the most common way to create an array. It uses square brackets `[]` and the elements are comma-separated.

    ```javascript
    let fruits = ['apple', 'banana', 'cherry'];
    ```

2. **Array constructor**: This uses the `new` keyword along with the `Array` constructor. It's less common and more verbose.

    ```javascript
    let fruits = new Array('apple', 'banana', 'cherry');
    ```

3. **Array.of() method**: This creates a new Array instance from a variable number of arguments.

    ```javascript
    let fruits = Array.of('apple', 'banana', 'cherry');
    ```

4. **Array.from() method**: This creates a new Array instance from an array-like or iterable object.

    ```javascript
    let fruits = Array.from(['apple', 'banana', 'cherry']);
    ```

In all these examples, `fruits` is an array that contains three strings. The strings are the elements of the array.

## Array Indexes

In JavaScript, each item in an array is assigned a numeric position, known as its index. Array indices start at 0 and increment by 1 for each subsequent element.

```javascript
let fruits = ['apple', 'banana', 'cherry'];

console.log(fruits[0]); // logs 'apple'
console.log(fruits[1]); // logs 'banana'
console.log(fruits[2]); // logs 'cherry'
```

Here, 'apple' is at index 0, 'banana' is at index 1, and 'cherry' is at index 2 in the `fruits` array.

You can use the index to access or modify the elements of the array:

```javascript
fruits[1] = 'blueberry'; // changes 'banana' to 'blueberry'
console.log(fruits[1]); // logs 'blueberry'
```

In this case, `fruits[1] = 'blueberry'` changes the second element of the array to 'blueberry'.

## Array Length

The `length` property of an array in JavaScript returns the number of elements in the array. It's not a method, so you don't call it with parentheses.

```javascript
let fruits = ['apple', 'banana', 'cherry'];
console.log(fruits.length); // logs 3
```

`fruits.length` is 3 because there are three elements in the `fruits` array.

You can also use the `length` property to change the number of elements in an array:

```javascript
fruits.length = 2;
console.log(fruits); // logs ['apple', 'banana']
```

Setting `fruits.length = 2` removes the last element from the array, so the array now only contains 'apple' and 'banana'.

## Array destructuring

Array destructuring in JavaScript is a syntax that allows you to unpack values from arrays, or properties from objects, into distinct variables.

```javascript
let fruits = ['apple', 'banana', 'cherry'];

let [fruit1, fruit2, fruit3] = fruits;

console.log(fruit1); // logs 'apple'
console.log(fruit2); // logs 'banana'
console.log(fruit3); // logs 'cherry'
```

In this example, the array `fruits` is destructured into three new variables `fruit1`, `fruit2`, and `fruit3`. The first element of the array is assigned to `fruit1`, the second element to `fruit2`, and the third element to `fruit3`.

You can also skip over elements that you don't need:

```javascript
let [fruit1, , fruit3] = fruits;

console.log(fruit1); // logs 'apple'
console.log(fruit3); // logs 'cherry'
```

The second element of the array is skipped and not assigned to any variable.

## The Spread Operator

The `...` notation in JavaScript is known as the spread operator. It allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.

Here's an example of how to create a new array using the spread operator:

```javascript
let fruits = ['apple', 'banana', 'cherry'];
let moreFruits = [...fruits, 'date', 'elderberry'];

console.log(moreFruits); // logs ['apple', 'banana', 'cherry', 'date', 'elderberry']
```

Here, `...fruits` expands the elements of the `fruits` array into individual elements. The `moreFruits` array is a new array that contains all the elements of the `fruits` array, followed by 'date' and 'elderberry'.

You can also use the spread operator to combine two arrays:

```javascript
let fruits1 = ['apple', 'banana'];
let fruits2 = ['cherry', 'date'];
let allFruits = [...fruits1, ...fruits2];

console.log(allFruits); // logs ['apple', 'banana', 'cherry', 'date']
```

`...fruits1` and `...fruits2` expand the elements of the `fruits1` and `fruits2` arrays into individual elements. The `allFruits` array is a new array that contains all the elements of the `fruits1` and `fruits2` arrays.