---
title: Javascript Control Flow - Javascript Cheatsheet
description: Control flow is the order in which individual statements, instructions or function calls are executed or evaluated. The control flow of a Javascript program is regulated by conditional statements, loops, and function calls.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Control Flow
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    A program Control Flow
  </base-disclaimer-title>
  <base-disclaimer-content>
  Control flow is the order in which individual statements, instructions, or function calls are executed or evaluated. The control flow of a Javascript program is regulated by conditional statements, loops, and function calls.
  </base-disclaimer-content>
</base-disclaimer>

## Comparison Operators

In JavaScript, comparison operators are used to compare two values. Here are the main comparison operators:

1. **Equal to (`==`)**: This operator checks if the values of two operands are equal or not. If yes, then the condition becomes true.

```javascript
console.log(5 == 5); // true
console.log(5 == '5'); // true, because it does type coercion
```

2. **Not equal to (`!=`)**: This operator checks if the values of two operands are equal or not. If the values are not equal, then the condition becomes true.

```javascript
console.log(5 != 4); // true
console.log(5 != '5'); // false, because it does type coercion
```

3. **Strictly equal to (`===`)**: This operator checks if the values of two operands are equal or not, and also checks the types. If yes, then the condition becomes true.

```javascript
console.log(5 === 5); // true
console.log(5 === '5'); // false, because the types are different
```

4. **Strictly not equal to (`!==`)**: This operator checks if the values of two operands are equal or not, or the types are not the same. If yes, then the condition becomes true.

```javascript
console.log(5 !== 4); // true
console.log(5 !== '5'); // true, because the types are different
```

5. **Greater than (`>`), Less than (`<`), Greater than or equal to (`>=`), Less than or equal to (`<=`)**: These operators are used to compare the values of two numbers.

```javascript
console.log(5 > 4); // true
console.log(5 < 4); // false
console.log(5 >= 5); // true
console.log(5 <= 4); // false
```

<base-disclaimer>
  <base-disclaimer-title>
    Comparison operators always return a boolean value
  </base-disclaimer-title>
  <base-disclaimer-content>
  Remember, comparison operators always return either `true` or `false`.
  </base-disclaimer-content>
</base-disclaimer>

## Boolean Operators

In JavaScript, Boolean operators are used to create more complex conditional statements using logical concepts. Here are the main Boolean operators:

1. **Logical AND (`&&`)**: This operator returns `true` if both operands are true.

```javascript
console.log(true && true); // true
console.log(true && false); // false
```

2. **Logical OR (`||`)**: This operator returns `true` if at least one of the operands is true.

```javascript
console.log(true || false); // true
console.log(false || false); // false
```

3. **Logical NOT (`!`)**: This operator returns `true` if the operand is false, and `false` if the operand is true. It basically reverses the Boolean value of the operand.

```javascript
console.log(!true); // false
console.log(!false); // true
```

These operators are often used in combination with comparison operators to create complex logical conditions. For example:

```javascript
let a = 10;
let b = 20;
if (a > 5 && b > 10) {
  console.log('Both conditions are true');
}
```

In this example, the message will be printed to the console because both conditions (`a > 5` and `b > 10`) are true.

## if Statements

In JavaScript, `if`, `else if`, and `else` are used to create conditional statements that allow your code to make decisions and take different actions depending on certain conditions. Here's how they work:

### if

This is used to specify a block of code to be executed if a specified condition is true.

```javascript
let a = 10;
if (a > 5) {
  console.log('a is greater than 5');
}
```

Because `a` is indeed greater than 5, the message 'a is greater than 5' will be printed to the console.

### else if

This is used to specify a new condition to test if the first condition is false.

```javascript
let a = 5;
if (a > 5) {
  console.log('a is greater than 5');
} else if (a == 5) {
  console.log('a is equal to 5');
}
```

Because `a` is not greater than 5, the first block of code is not executed. However, because `a` is indeed equal to 5, the message 'a is equal to 5' will be printed to the console.

### else

This is used to specify a block of code to be executed if all previous conditions are false.

```javascript
let a = 4;
if (a > 5) {
  console.log('a is greater than 5');
} else if (a == 5) {
  console.log('a is equal to 5');
} else {
  console.log('a is less than 5');
}
```

Because `a` is neither greater than 5 nor equal to 5, the message **a is less than 5** will be printed to the console.

## Ternary Operator

The ternary operator in JavaScript is a shortcut for the `if` statement. It's called "ternary" because it takes three operands: a condition, a result for `true`, and a result for `false`.

```javascript
condition ? expressionIfTrue : expressionIfFalse
```

If the `condition` is `true`, the operator returns the value of `expressionIfTrue`; if the `condition` is `false`, it returns the value of `expressionIfFalse`.

```javascript
let a = 10;
let result = a > 5 ? 'a is greater than 5' : 'a is not greater than 5';
console.log(result); // prints "a is greater than 5"
```

 `a` is indeed greater than 5, the variable `result` is set to the string 'a is greater than 5', and that's what gets printed to the console.

The ternary operator can be very useful for short, simple conditions, but for more complex conditions, using `if`, `else if`, and `else` can be more readable.

## Switch Statement

The `switch` statement in JavaScript is used to perform different actions based on different conditions. It's a good alternative to a series of `if`...`else if` statements when you have a single condition that can lead to several possible outcomes.

```javascript
switch(expression) {
  case value1:
    // code to be executed if expression equals value1
    break;
  case value2:
    // code to be executed if expression equals value2
    break;
  ...
  default:
    // code to be executed if expression doesn't match any cases
}
```

The `switch` statement evaluates an expression, matching the expression's value to a `case` clause, and executes statements associated with that case. If no matching case is found, it executes the code in the `default` clause.

```javascript
let fruit = 'apple';
switch (fruit) {
  case 'banana':
    console.log('I am a banana');
    break;
  case 'apple':
    console.log('I am an apple');
    break;
  default:
    console.log('I am not a banana or an apple');
}
```

Because `fruit` is 'apple', the message 'I am an apple' will be printed to the console. If `fruit` was 'banana', it would print 'I am a banana'. If `fruit` was anything else, it would print 'I am not a banana or an apple'. The `break` keyword is used to prevent the code from running into the next case automatically.


## While Loop

The `while` loop in JavaScript is used to repeatedly execute a block of code as long as a specified condition is `true`. Here's the syntax:

```javascript
while (condition) {
  // code to be executed as long as the condition is true
}
```

The `condition` can be any expression that evaluates to a boolean value, either `true` or `false`. If the condition is `true`, the code inside the loop will be executed. After each execution, the condition is checked again, and if it's still `true`, the loop continues to run. This process repeats until the condition becomes `false`.

```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```

The loop will print the numbers 0 through 4 to the console. The variable `i` starts at 0 and is incremented by 1 after each loop iteration. When `i` becomes 5, the condition `i < 5` is no longer true, so the loop stops running.

<base-warning>
  <base-warning-title>
    Always ensure the condition becomes false
  </base-warning-title>
  <base-warning-content>
    Be careful when writing `while` loops, because if the condition never becomes `false`, the loop will run indefinitely, which can cause your program to crash.
  </base-warning-content>
</base-warning>

<base-warning>
  <base-warning-title>
    Performance considerations
  </base-warning-title>
  <base-warning-content>
    Keep in mind that looping operations can be resource-intensive, especially with large data sets. Always consider the performance implications of your code when using loops.
  </base-warning-content>
</base-warning>

## Break and Continue Statements

In JavaScript, `break` and `continue` are two control flow statements that you can use in loops.

### Break

The `break` statement is used to exit the current loop prematurely, stopping its execution immediately. It's often used in `switch` statements, but can also be used in `for`, `while`, and `do...while` loops.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }
  console.log(i);
}
// This will print the numbers 0 through 4 to the console
```

The loop stops running when `i` is equal to 5, even though the loop condition `i < 10` would still be true.

### Continue

The `continue` statement is used to skip the current iteration of the loop and move directly to the next one. It ends the current iteration and continues with the next one.

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}
// This will print the numbers 0 through 4 and 6 through 9 to the console
```

In this example, the number 5 is not printed to the console because when `i` is equal to 5, the `continue` statement is executed, ending that iteration of the loop early.

<base-warning>
  <base-warning-title>
    Use `break` and `continue` judiciously
  </base-warning-title>
  <base-warning-content>
    Both `break` and `continue` can be very useful for controlling the flow of your loops, but they should be used judiciously, as they can make your code more difficult to read and understand if used excessively.
  </base-warning-content>
</base-warning>

## Do...While Loop

The `do...while` loop is a variant of the `while` loop in JavaScript. This loop will execute the block of code once, before checking if the condition is true, then it will repeat the loop as long as the condition is true.

```javascript
do {
  // code to be executed
} while (condition);
```

The `condition` can be any expression that evaluates to a boolean value, either `true` or `false`. If the condition is `true`, the loop will continue to run. This process repeats until the condition becomes `false`.

```javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
```

The loop will print the numbers 0 through 4 to the console. The variable `i` starts at 0 and is incremented by 1 after each loop iteration. When `i` becomes 5, the condition `i < 5` is no longer true, so the loop stops running.

<base-disclaimer>
  <base-disclaimer-title>
    Difference between `do...while` and `while`
  </base-disclaimer-title>
  <base-disclaimer-content>
  The key difference between `do...while` and `while` is that `do...while` guarantees the loop will run at least once, because it checks the condition after executing the loop body. In a `while` loop, if the condition is false at the start, the loop body might not run at all.
  </base-disclaimer-content>
</base-disclaimer>

## For Loop

The `for` loop in JavaScript is used to repeatedly execute a block of code a certain number of times. It's often used when you know beforehand how many times you need to loop.

```javascript
for (initialization; condition; finalExpression) {
  // code to be executed on each loop iteration
}
```

- `initialization` is executed before the loop starts. It's often used to declare and initialize a counter variable.
- `condition` is checked before each loop iteration. If it's `true`, the loop continues; if it's `false`, the loop stops.
- `finalExpression` is executed at the end of each loop iteration, usually to update the counter.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

The  `for` loop will print the numbers 0 through 4 to the console. The variable `i` starts at 0 and is incremented by 1 after each loop iteration. When `i` becomes 5, the condition `i < 5` is no longer true, so the loop stops running.

## For loops vs Array methods

The choice between a `for` loop and <router-link to="/cheatsheet/array-methods">array methods</router-link> like `forEach`, `map`, `filter`, `reduce`, etc., depends on the specific situation and your personal preference. Both have their uses and can be better in different scenarios.

**For Loop:**

- Gives you more control over the looping mechanism. You can control the initialization, condition checking, and increment/decrement.
- Can be more efficient in terms of performance for larger datasets.
- Can break out of a loop using `break` statement, which is not possible with array methods like `forEach`, `map`, etc.

**Array Methods:**

- Provide a more declarative and readable way to perform operations on arrays.
- `map`, `filter`, `reduce` etc., return a new array and do not mutate the original array, which helps in maintaining immutability in your code.
- Can be chained together to perform complex operations in a clean, readable way.

Here's an example of using `for` loop and `map` method to double the elements in an array:

**For Loop:**

```javascript
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i] * 2;
}
```

**Map Method:**

```javascript
let arr = [1, 2, 3, 4, 5];
let doubled = arr.map(num => num * 2);
```

In general, if you're working with arrays and don't need to break out of the loop, array methods can be a cleaner and more readable choice. If you need more control over the loop or are working with larger datasets, a `for` loop might be a better choice.