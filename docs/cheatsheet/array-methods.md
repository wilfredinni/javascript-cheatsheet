---
title: Javascript Array Methods - Javascript Cheatsheet
description: Array methods in JavaScript are built-in functions that you can use to perform operations on arrays. They provide a way to manipulate arrays and work with the elements stored in them.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Array Methods
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    Array methods in JavaScript
  </base-disclaimer-title>
  <base-disclaimer-content>
    Array methods in JavaScript are built-in functions that you can use to perform operations on arrays. They provide a way to manipulate arrays and work with the elements stored in them.
  </base-disclaimer-content>
</base-disclaimer>

## Array Push

The `push()` method is used to add one or more elements to the end of an array. It modifies the original array, returns the new length of the array, and is a destructive method.

```javascript
let fruits = ['apple', 'banana'];
fruits.push('orange'); // fruits is now ['apple', 'banana', 'orange']
```

'orange' is added to the end of the `fruits` array.

You can also add multiple elements at once:

```javascript
let fruits = ['apple', 'banana'];
fruits.push('orange', 'pineapple'); // fruits is now ['apple', 'banana', 'orange', 'pineapple']
```

'orange' and 'pineapple' are added to the end of the `fruits` array.

## Array Pop

The `pop()` method is used to remove the last element from an array and return that element. This method changes the length of the array.

```javascript
let fruits = ['apple', 'banana', 'orange'];
let lastFruit = fruits.pop(); // lastFruit is 'orange', fruits is now ['apple', 'banana']
```

`pop()` removes the last element 'orange' from the `fruits` array and returns it, storing it in the `lastFruit` variable. The `fruits` array is now ['apple', 'banana'].

## Array Shift

The `shift()` method is used to remove the first element from an array and return that element. This method changes the length of the array.

```javascript
let fruits = ['apple', 'banana', 'orange'];
let firstFruit = fruits.shift(); // firstFruit is 'apple', fruits is now ['banana', 'orange']
```

`shift()` removes the first element 'apple' from the `fruits` array and returns it, storing it in the `firstFruit` variable. The `fruits` array is now ['banana', 'orange'].

## Array Unshift

The `unshift()` method is used to add one or more elements to the beginning of an array and returns the new length of the array. This method changes the length of the array.

```javascript
let fruits = ['banana', 'orange'];
fruits.unshift('apple'); // fruits is now ['apple', 'banana', 'orange']
```

`unshift()` adds the element 'apple' to the beginning of the `fruits` array. The `fruits` array is now ['apple', 'banana', 'orange'].

You can also add multiple elements at once:

```javascript
let fruits = ['banana', 'orange'];
fruits.unshift('apple', 'pineapple'); // fruits is now ['apple', 'pineapple', 'banana', 'orange']
```

'apple' and 'pineapple' are added to the beginning of the `fruits` array.

## Array Concat

The `concat()` method is used to merge two or more arrays into one. This method does not change the existing arrays, but instead returns a new array that contains all the elements from the arrays you want to combine.

```javascript
let fruits1 = ['apple', 'banana'];
let fruits2 = ['orange', 'pineapple'];
let allFruits = fruits1.concat(fruits2); // allFruits is ['apple', 'banana', 'orange', 'pineapple']
```

`concat()` merges the `fruits1` and `fruits2` arrays into a new array `allFruits`.

You can also concatenate more than two arrays:

```javascript
let fruits1 = ['apple', 'banana'];
let fruits2 = ['orange', 'pineapple'];
let fruits3 = ['mango', 'kiwi'];
let allFruits = fruits1.concat(fruits2, fruits3); // allFruits is ['apple', 'banana', 'orange', 'pineapple', 'mango', 'kiwi']
```

`concat()` merges the `fruits1`, `fruits2`, and `fruits3` arrays into a new array `allFruits`.

## Array Slice

The `slice()` method returns a shallow copy of a portion of an array into a new array object selected from `start` to `end` (`end` not included). The original array will not be modified.

```javascript
let fruits = ['apple', 'banana', 'orange', 'pineapple', 'mango'];
let citrusFruits = fruits.slice(2, 4); // citrusFruits is ['orange', 'pineapple']
```

`slice()` returns a new array `citrusFruits` that contains the elements from the third position to the fourth position (0-indexed) in the `fruits` array. The `fruits` array remains unchanged.

If `end` is not specified, `slice()` will return all elements from `start` to the end of the array:

```javascript
let fruits = ['apple', 'banana', 'orange', 'pineapple', 'mango'];
let someFruits = fruits.slice(2); // someFruits is ['orange', 'pineapple', 'mango']
```

`slice()` returns a new array `someFruits` that contains all elements from the third position to the end of the `fruits` array.

## Array Splice

The `splice()` method changes the contents of an array by removing, replacing, or adding elements. It modifies the original array and returns an array containing the deleted elements, if any.

1. **Removing elements:**

```javascript
let fruits = ['apple', 'banana', 'orange', 'pineapple', 'mango'];
let removedFruits = fruits.splice(2, 2); // removedFruits is ['orange', 'pineapple'], fruits is ['apple', 'banana', 'mango']
```

`splice()` removes two elements starting from index 2 (0-indexed) in the `fruits` array. The removed elements are returned in the `removedFruits` array.

2. **Adding elements:**

```javascript
let fruits = ['apple', 'banana', 'mango'];
fruits.splice(2, 0, 'orange', 'pineapple'); // fruits is ['apple', 'banana', 'orange', 'pineapple', 'mango']
```

`splice()` adds 'orange' and 'pineapple' starting from index 2 in the `fruits` array. No elements are removed in this case.

3. **Replacing elements:**

```javascript
let fruits = ['apple', 'banana', 'mango'];
fruits.splice(1, 1, 'orange'); // fruits is ['apple', 'orange', 'mango']
```

Here, `splice()` replaces the element at index 1 ('banana') with 'orange' in the `fruits` array.


## Array Join

The `join()` method is used to join all elements of an array into a string. The elements will be separated by a specified separator. The default separator is a comma (`,`).

```javascript
let fruits = ['apple', 'banana', 'orange'];
let fruitsString = fruits.join(); // fruitsString is 'apple,banana,orange'
```

`join()` combines all elements of the `fruits` array into a string, with each element separated by a comma.

You can specify a different separator:

```javascript
let fruits = ['apple', 'banana', 'orange'];
let fruitsString = fruits.join(' - '); // fruitsString is 'apple - banana - orange'
```

`join()` combines all elements of the `fruits` array into a string, with each element separated by ' - '.

## Array Reverse

The `reverse()` method is used to reverse the order of the elements in an array. It mutates the original array.

```javascript
let fruits = ['apple', 'banana', 'orange'];
fruits.reverse(); // fruits is now ['orange', 'banana', 'apple']
```

`reverse()` reverses the order of the elements in the `fruits` array. The `fruits` array is now ['orange', 'banana', 'apple'].

## Array Sort

The `sort()` method is used to sort the elements of an array in place and returns the array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code unit values.

```javascript
let fruits = ['banana', 'apple', 'orange'];
fruits.sort(); // fruits is now ['apple', 'banana', 'orange']
```

`sort()` sorts the elements in the `fruits` array in alphabetical order.

Please note that `sort()` can behave unexpectedly with numbers, as it converts numbers to strings for sorting. To sort numbers in ascending order, you can use a compare function:

```javascript
let numbers = [40, 1, 5, 200];
numbers.sort(function(a, b) {
  return a - b;
}); // numbers is now [1, 5, 40, 200]
```

`sort()` sorts the `numbers` array in ascending order. The compare function subtracts `b` from `a`. If the result is negative, `a` is sorted to an index lower than `b`. If the result is positive, `a` is sorted to an index higher than `b`. If the result is 0, no changes are done with the sort order of the two values.

## Array IndexOf

The `indexOf()` method is used to search an array for a specific element and returns its first index. If the element is not found, it returns -1.

```javascript
let fruits = ['apple', 'banana', 'orange'];
let index = fruits.indexOf('banana'); // index is 1
```

`indexOf()` searches the `fruits` array for 'banana' and returns its index, which is 1.

If the element is not in the array, `indexOf()` returns -1:

```javascript
let fruits = ['apple', 'banana', 'orange'];
let index = fruits.indexOf('pineapple'); // index is -1
```

`indexOf()` searches the `fruits` array for 'pineapple', which is not in the array, so it returns -1.

## Array FindIndex

The `findIndex()` method is used to find the index of the first element in an array that satisfies a provided testing function. If no elements satisfy the testing function, it returns -1.

```javascript
let numbers = [5, 12, 8, 130, 44];
let isLargeNumber = (element) => element > 13;
let index = numbers.findIndex(isLargeNumber); // index is 3
```

`findIndex()` uses the `isLargeNumber` function to find the first element in the `numbers` array that is greater than 13 and returns its index, which is 3.

If no element satisfies the testing function, `findIndex()` returns -1:

```javascript
let numbers = [5, 12, 8, 10, 4];
let isLargeNumber = (element) => element > 13;
let index = numbers.findIndex(isLargeNumber); // index is -1
```

`findIndex()` uses the `isLargeNumber` function to find an element in the `numbers` array that is greater than 13. Since no such element exists, it returns -1.

## Array Find

The `find()` method returns the value of the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.

```javascript
let numbers = [5, 12, 8, 130, 44];
let isLargeNumber = (element) => element > 13;
let found = numbers.find(isLargeNumber); // found is 130
```

`find()` uses the `isLargeNumber` function to find the first element in the `numbers` array that is greater than 13 and returns its value, which is 130.

If no element satisfies the testing function, `find()` returns undefined:

```javascript
let numbers = [5, 12, 8, 10, 4];
let isLargeNumber = (element) => element > 13;
let found = numbers.find(isLargeNumber); // found is undefined
```

`find()` uses the `isLargeNumber` function to find an element in the `numbers` array that is greater than 13. Since no such element exists, it returns undefined.

## Array Filter

The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.

```javascript
let numbers = [5, 12, 8, 130, 44];
let isLargeNumber = (element) => element > 13;
let filtered = numbers.filter(isLargeNumber); // filtered is [130, 44]
```

`filter()` uses the `isLargeNumber` function to create a new array with elements from the `numbers` array that are greater than 13.

If no elements pass the test, `filter()` returns an empty array:

```javascript
let numbers = [5, 12, 8, 10, 4];
let isLargeNumber = (element) => element > 13;
let filtered = numbers.filter(isLargeNumber); // filtered is []
```

`filter()` uses the `isLargeNumber` function to create a new array with elements from the `numbers` array that are greater than 13. Since no such elements exist, it returns an empty array.

## Array Map

The `map()` method creates a new array with the results of calling a provided function on every element in the calling array.

```javascript
let numbers = [1, 4, 9, 16];
let roots = numbers.map(Math.sqrt); // roots is [1, 2, 3, 4]
```

`map()` uses the `Math.sqrt` function to create a new array with the square root of each element in the `numbers` array.

You can also use `map()` with a function that you define:

```javascript
let numbers = [1, 4, 9, 16];
let doubles = numbers.map((num) => num * 2); // doubles is [2, 8, 18, 32]
```

`map()` uses the provided function to create a new array with each element in the `numbers` array multiplied by 2.

## Array Reduce

The `reduce()` method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

```javascript
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue); // sum is 10
```

`reduce()` uses the provided function to add up the elements in the `numbers` array. The function takes two arguments: the accumulator and the current value. The accumulator is the value returned by the last invocation of the function (or the initial value, if provided), and the current value is the current element being processed.

You can also provide an initial value for the accumulator:

```javascript
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 10); // sum is 20
```

`reduce()` starts with an initial accumulator value of 10, and then adds each element in the `numbers` array to this accumulator.

## Array Every

The `every()` method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.

```javascript
let numbers = [1, 30, 39, 29, 10, 13];
let isBelowThreshold = (currentValue) => currentValue < 40;
let result = numbers.every(isBelowThreshold); // result is true
```

`every()` uses the `isBelowThreshold` function to check if every element in the `numbers` array is less than 40. Since all elements pass this test, `every()` returns true.

If not all elements pass the test, `every()` returns false:

```javascript
let numbers = [1, 30, 39, 50, 13];
let isBelowThreshold = (currentValue) => currentValue < 40;
let result = numbers.every(isBelowThreshold); // result is false
```

`every()` uses the `isBelowThreshold` function to check if every element in the `numbers` array is less than 40. Since the element 50 does not pass this test, `every()` returns false.

## Array Some

The `some()` method tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.

```javascript
let numbers = [1, 2, 3, 4, 5];
let isEven = (element) => element % 2 === 0;
let result = numbers.some(isEven); // result is true
```

`some()` uses the `isEven` function to check if there's at least one element in the `numbers` array that is even. Since the number 2 is even, `some()` returns true.

If no elements pass the test, `some()` returns false:

```javascript
let numbers = [1, 3, 5, 7, 9];
let isEven = (element) => element % 2 === 0;
let result = numbers.some(isEven); // result is false
```

`some()` uses the `isEven` function to check if there's at least one element in the `numbers` array that is even. Since no elements are even, `some()` returns false.

## Array ForEach

The `forEach()` method executes a provided function once for each array element.

```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.forEach((element) => console.log(element));
```

`forEach()` uses the provided function to print each element in the `numbers` array to the console.

Please note that `forEach()` does not return a value. It simply executes the provided function on each element in the array. If you need to create a new array based on the original array, consider using `map()` instead. If you need to test elements in the array and return a Boolean, consider using `every()` or `some()`. If you need to find an element in the array, consider using `find()`.

## Array isArray

The `Array.isArray()` method is used to determine whether the passed value is an Array. It returns a Boolean.

```javascript
let fruits = ['apple', 'banana', 'orange'];
let result = Array.isArray(fruits); // result is true
```

`Array.isArray()` checks if `fruits` is an array. Since `fruits` is indeed an array, `Array.isArray()` returns true.

If the passed value is not an array, `Array.isArray()` returns false:

```javascript
let number = 123;
let result = Array.isArray(number); // result is false
```

`Array.isArray()` checks if `number` is an array. Since `number` is not an array, `Array.isArray()` returns false.

## Array Includes

The `includes()` method is used to determine whether an array includes a certain value among its entries, returning true or false as appropriate.

```javascript
let fruits = ['apple', 'banana', 'orange'];
let result = fruits.includes('banana'); // result is true
```

`includes()` checks if `fruits` includes 'banana'. Since 'banana' is indeed in the array, `includes()` returns true.

If the value is not in the array, `includes()` returns false:

```javascript
let fruits = ['apple', 'banana', 'orange'];
let result = fruits.includes('pineapple'); // result is false
```

`includes()` checks if `fruits` includes 'pineapple'. Since 'pineapple' is not in the array, `includes()` returns false.

## Array Fill

The `fill()` method changes all elements in an array to a static value, from a start index (default 0) to an end index (default array.length). It returns the modified array.

```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.fill(0); // numbers is now [0, 0, 0, 0, 0]
```

`fill()` changes all elements in the `numbers` array to 0.

You can also specify a start index and an end index:

```javascript
let numbers = [1, 2, 3, 4, 5];
numbers.fill(0, 1, 3); // numbers is now [1, 0, 0, 4, 5]
```

`fill()` changes the elements at index 1 and 2 in the `numbers` array to 0. The start index is inclusive, and the end index is exclusive.

## Array Flat

The `flat()` method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.

```javascript
let nestedArray = [1, 2, [3, 4]];
let flatArray = nestedArray.flat(); // flatArray is [1, 2, 3, 4]
```

`flat()` flattens the `nestedArray` into a new array, `flatArray`.

By default, `flat()` only flattens one level deep. If you have a more deeply nested array, you can specify the depth as an argument:

```javascript
let deeplyNestedArray = [1, [2, [3, [4]]]];
let flatArray = deeplyNestedArray.flat(3); // flatArray is [1, 2, 3, 4]
```

`flat()` flattens the `deeplyNestedArray` into a new array, `flatArray`, up to 3 levels deep.

## Array FlatMap

The `flatMap()` method first maps each element using a mapping function, then flattens the result into a new array. It's essentially equivalent to a `map()` followed by a `flat()` of depth 1, but `flatMap()` is often quite useful, as merging both into one method is slightly more efficient.

```javascript
let arr = [1, 2, 3, 4];
let newArr = arr.flatMap(x => [x * 2]); // newArr is [2, 4, 6, 8]
```

`flatMap()` first maps each element in the array to an array containing its double (i.e., `[x * 2]`), and then flattens the result (i.e., `[[2], [4], [6], [8]]`) into a new array.

You can also use `flatMap()` to interleave different data:

```javascript
let arr = ["it's Sunny in", "", "California"];
let newArr = arr.flatMap(x => x.split(' ')); // newArr is ["it's", "Sunny", "in", "", "California"]
```

`flatMap()` first maps each string in the array to an array of words (i.e., `x.split(' ')`), and then flattens the result into a new array.

## Array From

The `Array.from()` method creates a new, shallow-copied Array instance from an array-like or iterable object.

```javascript
let string = 'hello';
let array = Array.from(string); // array is ['h', 'e', 'l', 'l', 'o']
```

`Array.from()` creates a new array from the string 'hello'. Each character in the string becomes an element in the new array.

You can also use `Array.from()` with a map function:

```javascript
let numbers = [1, 2, 3, 4];
let doubles = Array.from(numbers, x => x * 2); // doubles is [2, 4, 6, 8]
```

`Array.from()` creates a new array from the `numbers` array. The map function is applied to each element in the `numbers` array, so each element in the new array is twice the corresponding element in the original array.

## Array Keys

The `keys()` method returns a new Array Iterator object that contains the keys for each index in the array.

```javascript
let array = ['a', 'b', 'c'];
let iterator = array.keys();

for (let key of iterator) {
  console.log(key); // logs 0, then 1, then 2
}
```

`keys()` creates a new Array Iterator object for the `array`. The for-of loop then iterates over each key in the iterator, logging each key to the console.

Please note that the keys are the indices of the array elements, not the elements themselves. If you need to iterate over the elements in the array, consider using `forEach()`, `map()`, or a for-of loop with the array directly.

## Array Values

The `values()` method returns a new Array Iterator object that contains the values for each index in the array.

```javascript
let array = ['a', 'b', 'c'];
let iterator = array.values();

for (let value of iterator) {
  console.log(value); // logs 'a', then 'b', then 'c'
}
```

`values()` creates a new Array Iterator object for the `array`. The for-of loop then iterates over each value in the iterator, logging each value to the console.

Please note that the values are the elements of the array, not the indices. If you need to iterate over the indices in the array, consider using `keys()`, or a for-in loop with the array directly.

## Array Entries

The `entries()` method returns a new Array Iterator object that contains the key/value pairs for each index in the array.

```javascript
let array = ['a', 'b', 'c'];
let iterator = array.entries();

for (let [index, value] of iterator) {
  console.log(`index: ${index}, value: ${value}`); 
  // logs 'index: 0, value: a', then 'index: 1, value: b', then 'index: 2, value: c'
}
```

`entries()` creates a new Array Iterator object for the `array`. The for-of loop then iterates over each entry in the iterator, logging each index and value to the console.

Please note that the entries are key/value pairs in the form of [index, element]. If you need to iterate over the indices or elements in the array separately, consider using `keys()`, `values()`, or a for-in loop with the array directly.