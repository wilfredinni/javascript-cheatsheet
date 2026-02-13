---
title: Javascript Math - Javascript Cheatsheet
description: The JavaScript `Math` object allows you to perform mathematical tasks on numbers.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Math
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    Math Object
  </base-disclaimer-title>
  <base-disclaimer-content>
    The `Math` object is not a constructor. All properties and methods of `Math` are static. You refer to the constant pi as `Math.PI` and you call the sine function as `Math.sin(x)`, where x is the method's argument.
  </base-disclaimer-content>
</base-disclaimer>

## Math.PI

Math.PI returns the ratio of a circle's circumference to its diameter (approx. 3.14159).

```javascript run
console.log(Math.PI);
```

## Math.round()

Math.round(x) returns the value of x rounded to its nearest integer.

```javascript run
console.log(Math.round(4.7));
console.log(Math.round(4.4));
```

## Math.pow()

Math.pow(x, y) returns the value of x to the power of y.

```javascript run
console.log(Math.pow(8, 2));
```

## Math.sqrt()

Math.sqrt(x) returns the square root of x.

```javascript run
console.log(Math.sqrt(64));
```

## Math.abs()

Math.abs(x) returns the absolute (positive) value of x.

```javascript run
console.log(Math.abs(-4.7));
```

## Math.ceil()

Math.ceil(x) returns the value of x rounded **up** to its nearest integer.

```javascript run
console.log(Math.ceil(4.4));
```

## Math.floor()

Math.floor(x) returns the value of x rounded **down** to its nearest integer.

```javascript run
console.log(Math.floor(4.7));
```

## Math.min() and Math.max()

`Math.min()` and `Math.max()` can be used to find the lowest or highest value in a list of arguments.

```javascript run
console.log(Math.min(0, 150, 30, 20, -8, -200));
console.log(Math.max(0, 150, 30, 20, -8, -200));
```

## Math.random()

`Math.random()` returns a random number between 0 (inclusive), and 1 (exclusive).

```javascript run
console.log(Math.random());
```

### Random Integer

This JavaScript function always returns a random integer between min (included) and max (excluded):

```javascript run
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

console.log(getRndInteger(0, 10));
```

## Math.trunc()

Math.trunc(x) returns the integer part of x (new in ES6).

```javascript run
console.log(Math.trunc(4.9));
console.log(Math.trunc(-4.2));
```
