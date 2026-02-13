---
title: Javascript JSON - Javascript Cheatsheet
description: JSON (JavaScript Object Notation) is a lightweight data-interchange format. Learn how to parse and stringify JSON.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript JSON
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    What is JSON?
  </base-disclaimer-title>
  <base-disclaimer-content>
    JSON (JavaScript Object Notation) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa).
  </base-disclaimer-content>
</base-disclaimer>

## JSON.stringify()

The `JSON.stringify()` method converts a JavaScript object or value to a JSON string.

```javascript run
const obj = {
  name: "John",
  age: 30,
  city: "New York"
};

const jsonString = JSON.stringify(obj);
console.log(jsonString);
```

You can also use it to format the output for readability (pretty-print) by passing arguments for replacer (null) and space (2 or 4).

```javascript run
const obj = {
  name: "John",
  age: 30,
  city: "New York"
};

const prettyJson = JSON.stringify(obj, null, 2);
console.log(prettyJson);
```

## JSON.parse()

The `JSON.parse()` method parses a JSON string, constructing the JavaScript value or object described by the string.

```javascript run
const jsonString = '{"name":"John", "age":30, "city":"New York"}';

const obj = JSON.parse(jsonString);
console.log(obj.name);
```

<base-warning>
  <base-warning-title>
    Parsing Errors
  </base-warning-title>
  <base-warning-content>
    `JSON.parse()` will throw an error if the string passed to it is not valid JSON. Always ensure your JSON strings are well-formed (e.g., proper quoting of keys). It's good practice to wrap `JSON.parse()` in a `try...catch` block.
  </base-warning-content>
</base-warning>

## Deep Copy with JSON

You can create a deep copy of an object (if it doesn't contain functions, Dates, `undefined`, or circular references) using a combination of `JSON.parse()` and `JSON.stringify()`.

```javascript run
const original = {
  name: "Alice",
  details: {
    age: 25,
    hobbies: ["reading", "coding"]
  }
};

const copy = JSON.parse(JSON.stringify(original));

// Modify the copy
copy.details.age = 30;

// The original remains unchanged
console.log(original.details.age);
console.log(copy.details.age);
```

This method is simple but has limitations (it loses `Date` objects and `undefined` values). For complex objects, consider using `structuredClone()` or a library like Lodash.

## Handling Dates

JSON does not have a built-in date type. Dates are often serialized as ISO strings.

```javascript run
const event = {
  title: "Conference",
  date: new Date()
};

const json = JSON.stringify(event);
console.log(json);

const parsed = JSON.parse(json);
console.log(typeof parsed.date);

// You need to manually convert it back to a Date object
parsed.date = new Date(parsed.date);
console.log(parsed.date.getFullYear());
```
