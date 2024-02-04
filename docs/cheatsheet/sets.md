---
title: Javascript Sets - Javascript Cheatsheet
description: A set is a built-in object that stores unique values of any type, whether primitive values or object references.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Sets
</base-title>

Sets are commonly used in scenarios where you need to work with collections of unique elements. 

<base-disclaimer>
  <base-disclaimer-title>
    From the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank">MDN Web Docs</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
    The Set object lets you store unique values of any type, whether primitive values or object references.
  </base-disclaimer-content>
</base-disclaimer>

## Common Use Cases

### Removing duplicates from an array

Since a Set automatically removes duplicates, you can convert an array to a Set and back to an array to remove duplicate elements.

```javascript
let array = [1, 2, 2, 3, 4, 4, 5];
let uniqueArray = [...new Set(array)];
console.log(uniqueArray); // Outputs: [1, 2, 3, 4, 5]
```

### Membership check

Checking if an element exists in a Set is faster and more efficient than checking if it exists in an array.

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);
console.log(mySet.has(3)); // Outputs: true
```

### Set operations

You can perform operations like union, intersection, difference, and symmetric difference on Sets, similar to mathematical set operations.

<base-warning>
  <base-warning-title>
    Remember!
  </base-warning-title>
  <base-warning-content>
    Sets only store unique values, so they are not suitable for cases where duplicate values are important.
  </base-warning-content>
</base-warning>

## Set Declaration

A Set is declared using the `new Set()` constructor. You can optionally pass an iterable (like an array) to the constructor to initialize the Set with values.

```javascript
// Declare an empty Set
let set1 = new Set();

// Declare a Set with initial values
let set2 = new Set([1, 2, 3, 4, 5]);

console.log(set1); // Outputs: Set(0) {}
console.log(set2); // Outputs: Set(5) { 1, 2, 3, 4, 5 }
```

`set1` is an empty Set, and `set2` is a Set initialized with the values 1, 2, 3, 4, and 5. Note that Sets automatically remove duplicate values, so each value in a Set is unique.

## Checking if a Value Exists

You can check if a value exists in a Set using the `has` method. The `has` method returns a boolean indicating whether the value exists in the Set:

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);

console.log(mySet.has(1)); // Outputs: true
console.log(mySet.has(6)); // Outputs: false
```

`mySet` is a Set initialized with the values 1, 2, 3, 4, and 5. The `has` method is used to check if the values 1 and 6 exist in the Set.

## Adding and Deleting Values

Add and delete values in a Set using the `add` and `delete` methods respectively.

### Adding Values

You can add a value to a Set using the `add` method. The `add` method appends a new element with a specified value to the end of a Set object.

```javascript
let mySet = new Set();

mySet.add(1);
mySet.add(2);
mySet.add(3);

console.log(mySet); // Outputs: Set(3) { 1, 2, 3 }
```

Here, we're adding the values 1, 2, and 3 to the Set `mySet`.

### Deleting Values

You can delete a value from a Set using the `delete` method. The `delete` method removes the specified element from a Set.

```javascript
let mySet = new Set([1, 2, 3]);

mySet.delete(2);

console.log(mySet); // Outputs: Set(2) { 1, 3 }
```

We're deleting the value 2 from the Set `mySet`.

## Getting the Size of a Set

Get the size (number of elements) of a Set using the `size` property.

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);

console.log(mySet.size); // Outputs: 5
```

`mySet` is a Set initialized with the values 1, 2, 3, 4, and 5. The `size` property is used to get the number of elements in the Set.

## Iterating Over a Set

You can iterate over a Set using several methods:

1. **For...of loop**: Iterate over the values in a Set.

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);

for (let value of mySet) {
  console.log(value);
}
```

2. **forEach method**: This allows you to execute a function for each value in a Set.

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);

mySet.forEach(function(value) {
  console.log(value);
});
```

3. **Spread operator**: Convert a Set into an Array, which can be useful for iteration.

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);
let array = [...mySet];

array.forEach(function(value) {
  console.log(value);
});
```

In each of these examples, we're iterating over the Set `mySet` and logging each value to the console.

## Clearing a Set

In JavaScript, you can clear all values from a Set using the `clear` method.

```javascript
let mySet = new Set([1, 2, 3, 4, 5]);

console.log(mySet.size); // Outputs: 5

mySet.clear();

console.log(mySet.size); // Outputs: 0
```

`mySet` is a Set initialized with the values 1, 2, 3, 4, and 5. The `clear` method is used to remove all values from the Set. After clearing, the size of the Set is 0.

In JavaScript, you can perform set operations like union, intersection, difference, and symmetric difference using Sets. Here's how you can do it:

## Set Union

The union of two sets is a set of all elements from both sets. You can get the union of two sets by creating a new Set from the concatenation of the two sets.

```javascript
let setA = new Set([1, 2, 3]);
let setB = new Set([3, 4, 5]);

let union = new Set([...setA, ...setB]);
console.log([...union]); // Outputs: [1, 2, 3, 4, 5]
```

## Set Intersection

The intersection of two sets is a set of elements that are common to both sets. You can get the intersection of two sets by filtering one set for elements that also exist in the other set.

```javascript
let setA = new Set([1, 2, 3]);
let setB = new Set([3, 4, 5]);

let intersection = new Set([...setA].filter(x => setB.has(x)));
console.log([...intersection]); // Outputs: [3]
```

## Set Difference

The difference of two sets is a set of elements that exist in the first set but not in the second set. You can get the difference of two sets by filtering the first set for elements that do not exist in the second set.

```javascript
let setA = new Set([1, 2, 3]);
let setB = new Set([3, 4, 5]);

let difference = new Set([...setA].filter(x => !setB.has(x)));
console.log([...difference]); // Outputs: [1, 2]
```

## Set Symmetric Difference

The symmetric difference of two sets is a set of elements that exist in either of the two sets but not in their intersection. You can get the symmetric difference of two sets by getting the union of the two sets and then filtering out the intersection.

```javascript
let setA = new Set([1, 2, 3]);
let setB = new Set([3, 4, 5]);

let union = new Set([...setA, ...setB]);
let intersection = new Set([...setA].filter(x => setB.has(x)));

let symmetricDifference = new Set([...union].filter(x => !intersection.has(x)));
console.log([...symmetricDifference]); // Outputs: [1, 2, 4, 5]
```