---
title: Javascript Objects - Javascript Cheatsheet
description: JavaScript objects are containers for named values, called properties and methods.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Objects
</base-title>

JavaScript objects are containers for named values, called properties and methods.

<base-disclaimer>
  <base-disclaimer-title>
    From the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank">MDN Web Docs</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
    The Object type represents one of JavaScript's data types. It is used to store various keyed collections and more complex entities. Objects can be created using the Object() constructor or the object initializer / literal syntax.
  </base-disclaimer-content>
</base-disclaimer>

An example JavaScript object:

```javascript
let car = {
  maker: "Toyota",
  model: "Camry",
  year: 2020,
  startEngine: function() {
    return "Engine started";
  }
};
```

`maker`, `model`, and `year` are properties of the `car` object, and `startEngine` is a method. You can access the properties using dot notation (e.g., `car.maker`) or bracket notation (e.g., `car["maker"]`), and you can call the method like this: `car.startEngine()`.

## Object Declaration

You can declare an object in a few different ways:

1. **Object Literal Syntax**: This is the most common way to create an object in JavaScript. You simply define the property and value within curly braces `{}`.

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};
```

2. **Object Constructor**: This is another way to create an object but it's not as commonly used as the literal syntax.

```javascript
let obj = new Object();
obj.key1 = 'value1';
obj.key2 = 'value2';
obj.key3 = 'value3';
```

3. **Constructor Function**: If you need to create multiple objects with the same structure, you can use a constructor function.

```javascript
function MyObject(key1, key2, key3) {
  this.key1 = key1;
  this.key2 = key2;
  this.key3 = key3;
}

let obj = new MyObject('value1', 'value2', 'value3');
```

In all these examples, `obj` is an object with properties `key1`, `key2`, and `key3`.

## Object Properties

You can read an object property using either `dot notation` or `bracket notation`.

1. **Dot Notation**:

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

console.log(obj.key1); // Outputs: 'value1'
```

2. **Bracket Notation**:

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

console.log(obj['key1']); // Outputs: 'value1'
```

In both examples, we're reading the property `key1` from the object `obj`.

## Updating Object Properties

Update the properties of an object using either `dot notation` or `bracket notation`.

1. **Dot Notation**:

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

obj.key1 = 'new value1';
console.log(obj.key1); // Outputs: 'new value1'
```

2. **Bracket Notation**:

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

obj['key1'] = 'new value1';
console.log(obj['key1']); // Outputs: 'new value1'
```

In both cases, we're updating the property `key1` of the object `obj` to a new value.

## Adding Object Properties

Add properties to an object after it has been created. This can be done using either `dot notation` or `bracket notation`.

1. **Dot Notation**:

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2'
};

obj.key3 = 'value3';
console.log(obj.key3); // Outputs: 'value3'
```

2. **Bracket Notation**:

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2'
};

obj['key3'] = 'value3';
console.log(obj['key3']); // Outputs: 'value3'
```

In both examples, we're adding a new property `key3` to the object `obj`.

## Deleting Object Properties

In JavaScript, you can delete properties from an object using the `delete` operator:

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

delete obj.key1;
console.log(obj.key1); // Outputs: undefined
```

We're deleting the property `key1` from the object `obj`. After the deletion, when we try to access `obj.key1`, it returns `undefined` because the property no longer exists.

## Checking if a Property Exists

You can check if a property exists in an object using several methods:

1. **The `in` operator**: This returns `true` if the property exists in the object.

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2'
};

console.log('key1' in obj); // Outputs: true
console.log('key3' in obj); // Outputs: false
```

2. **The `hasOwnProperty` method**: This returns `true` if the object has the specified property as its own property (not inherited).

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2'
};

console.log(obj.hasOwnProperty('key1')); // Outputs: true
console.log(obj.hasOwnProperty('key3')); // Outputs: false
```

3. **Direct property access**: This checks if the property value is `undefined`. However, this method can give false negatives if the property exists but its value is set to `undefined`.

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2'
};

console.log(obj.key1 !== undefined); // Outputs: true
console.log(obj.key3 !== undefined); // Outputs: false
```

## Iterating Over Object Properties

Iterate over an object's properties using a `for...in` loop.

```javascript
let obj = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key + ': ' + obj[key]);
  }
}
```

The `for...in` loop iterates over each property in the object `obj`. The `hasOwnProperty` method is used to ensure that the property belongs to the object itself and not its prototype chain. The output will be:

```
key1: value1
key2: value2
key3: value3
```

## Object Methods

Objects can have methods. Methods are functions that are stored as object properties.

```javascript
let obj = {
  property1: 'value1',
  property2: 'value2',
  myMethod: function() {
    console.log('This is a method!');
  }
};

// Call the method
obj.myMethod(); // Outputs: 'This is a method!'
```

`myMethod` is a method of the object `obj`. You can call it using the object name followed by the method name.

You can also use the `this` keyword in methods to refer to the object:

```javascript
let obj = {
  property1: 'value1',
  property2: 'value2',
  myMethod: function() {
    console.log('Property1 is ' + this.property1);
  }
};

// Call the method
obj.myMethod(); // Outputs: 'Property1 is value1'
```

`this.property1` within the method refers to the `property1` of the object `obj`.
