---
title: Javascript Classes - Javascript Cheatsheet
description: ES6 introduced classes as a syntactical sugar over JavaScript's existing prototype-based inheritance. Classes provide a much clearer and simpler syntax to create objects and deal with inheritance.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Classes
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    Classes
  </base-disclaimer-title>
  <base-disclaimer-content>
    JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance. The class syntax does not introduce a new object-oriented inheritance model to JavaScript.
  </base-disclaimer-content>
</base-disclaimer>

## Class Declaration

You define a class using the `class` keyword followed by the name of the class.

```javascript run
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.height);
```

The `constructor` method is a special method for creating and initializing an object created with a class. There can only be one special method with the name "constructor" in a class.

## Methods

You can define methods inside a class. These methods are stored on the prototype of the class.

```javascript run
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle(10, 10);
console.log(square.calcArea());
```

## Getters and Setters

You can use the `get` and `set` keywords to define getters and setters for properties.

```javascript run
class User {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name.toUpperCase();
  }

  set name(newName) {
    if (newName.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = newName;
  }
}

let user = new User("John");
console.log(user.name);

user.name = "Al";
console.log(user.name);
```

## Static Methods

The `static` keyword defines a static method for a class. Static methods are called without instantiating their class and cannot be called through a class instance. They are often used to create utility functions for an application.

```javascript run
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```

## Inheritance

Classes can inherit from other classes using the `extends` keyword.

```javascript run
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak();
```

The `super` keyword is used to access and call functions on an object's parent.

## Private Fields

Class fields are public by default, but private class members can be created by using a hash `#` prefix. The privacy encapsulation of these class features is enforced by JavaScript itself.

```javascript run
class Counter {
  #count = 0;

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount());
```
