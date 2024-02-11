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

You can declare variables using `var`, `let`, and `const` keywords. Here's what you need to know about each:

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

## Arithmetic Operators

Arithmetic operators are used to perform mathematical operation:

| Operator | Description         | Example           | Result     |
| -------- | ------------------- | ----------------- | ---------- |
| `+`      | Addition            | `5 + 2`           | `7`        |
| `-`      | Subtraction         | `5 - 2`           | `3`        |
| `*`      | Multiplication      | `5 * 2`           | `10`       |
| `/`      | Division            | `5 / 2`           | `2.5`      |
| `%`      | Modulus (Remainder) | `5 % 2`           | `1`        |
| `++`     | Increment           | `let x = 5; x++;` | `x` is `6` |
| `--`     | Decrement           | `let x = 5; x--;` | `x` is `4` |
| `**`     | Exponentiation      | `5 ** 2`          | `25`       |


1. **Addition (`+`)**: Adds two numbers.

```javascript
let result = 5 + 10; // result is 15
```

2. **Subtraction (`-`)**: Subtracts the second number from the first.

```javascript
let result = 10 - 5; // result is 5
```

3. **Multiplication (`*`)**: Multiplies two numbers.

```javascript
let result = 5 * 10; // result is 50
```

4. **Division (`/`)**: Divides the first number by the second.

```javascript
let result = 10 / 5; // result is 2
```

5. **Modulus (`%`)**: Returns the remainder of the division of the first number by the second.

```javascript
let result = 10 % 3; // result is 1
```

6. **Increment (`++`)**: Increases a number by 1.

```javascript
let num = 5;
num++; // num is now 6
```

7. **Decrement (`--`)**: Decreases a number by 1.

```javascript
let num = 5;
num--; // num is now 4
```

8. **Exponentiation (`**`)**: Raises the first number to the power of the second number.

```javascript
let result = 5 ** 2; // result is 25
```

These operators can be used with numbers, variables, or expressions.

## Assignment Operators

Assignment operators are used to assign values to variables:

| Operator | Description               | Example               | Result      |
| -------- | ------------------------- | --------------------- | ----------- |
| `=`      | Assignment                | `let x = 10;`         | `x` is `10` |
| `+=`     | Addition assignment       | `let x = 5; x += 10;` | `x` is `15` |
| `-=`     | Subtraction assignment    | `let x = 10; x -= 5;` | `x` is `5`  |
| `*=`     | Multiplication assignment | `let x = 5; x *= 10;` | `x` is `50` |
| `/=`     | Division assignment       | `let x = 10; x /= 5;` | `x` is `2`  |
| `%=`     | Modulus assignment        | `let x = 10; x %= 3;` | `x` is `1`  |
| `**=`    | Exponentiation assignment | `let x = 5; x **= 2;` | `x` is `25` |

1. **Assignment (`=`)**: Assigns the value on the right to the variable on the left.

```javascript
let x = 10; // x is now 10
```

2. **Addition assignment (`+=`)**: Adds the value on the right to the variable on the left and assigns the result to the variable on the left.

```javascript
let x = 5;
x += 10; // x is now 15
```

3. **Subtraction assignment (`-=`)**: Subtracts the value on the right from the variable on the left and assigns the result to the variable on the left.

```javascript
let x = 10;
x -= 5; // x is now 5
```

4. **Multiplication assignment (`*=`)**: Multiplies the variable on the left by the value on the right and assigns the result to the variable on the left.

```javascript
let x = 5;
x *= 10; // x is now 50
```

5. **Division assignment (`/=`)**: Divides the variable on the left by the value on the right and assigns the result to the variable on the left.

```javascript
let x = 10;
x /= 5; // x is now 2
```

6. **Modulus assignment (`%=`)**: Divides the variable on the left by the value on the right and assigns the remainder to the variable on the left.

```javascript
let x = 10;
x %= 3; // x is now 1
```

7. **Exponentiation assignment (`**=`)**: Raises the variable on the left to the power of the value on the right and assigns the result to the variable on the left.

```javascript
let x = 5;
x **= 2; // x is now 25
```

These operators provide a shorthand way to update the value of a variable in relation to its current value.

## Comparison Operators

Comparison operators are used to compare two values:

| Operator | Description              | Example     | Result |
| -------- | ------------------------ | ----------- | ------ |
| `==`     | Equal to                 | `5 == 5`    | `true` |
| `!=`     | Not equal to             | `5 != 4`    | `true` |
| `===`    | Strictly equal to        | `5 === 5`   | `true` |
| `!==`    | Strictly not equal to    | `5 !== '5'` | `true` |
| `>`      | Greater than             | `10 > 5`    | `true` |
| `<`      | Less than                | `5 < 10`    | `true` |
| `>=`     | Greater than or equal to | `10 >= 10`  | `true` |
| `<=`     | Less than or equal to    | `5 <= 5`    | `true` |

1. **Equal to (`==`)**: Returns true if the operands are equal.

```javascript
5 == 5; // true
'5' == 5; // true, because it does type coercion
```

2. **Not equal to (`!=`)**: Returns true if the operands are not equal.

```javascript
5 != 4; // true
```

3. **Strictly equal to (`===`)**: Returns true if the operands are equal and of the same type.

```javascript
5 === 5; // true
'5' === 5; // false, because the types are different
```

4. **Strictly not equal to (`!==`)**: Returns true if the operands are not equal or not of the same type.

```javascript
5 !== '5'; // true
```

5. **Greater than (`>`)**: Returns true if the left operand is greater than the right operand.

```javascript
10 > 5; // true
```

6. **Less than (`<`)**: Returns true if the left operand is less than the right operand.

```javascript
5 < 10; // true
```

7. **Greater than or equal to (`>=`)**: Returns true if the left operand is greater than or equal to the right operand.

```javascript
10 >= 10; // true
```

8. **Less than or equal to (`<=`)**: Returns true if the left operand is less than or equal to the right operand.

```javascript
5 <= 5; // true
```

These operators are often used in conditional statements to perform different actions based on different conditions.

## Logical Operators

Logical operators are used to determine the logic between variables or values:

| Operator | Description | Example           | Result  |
| -------- | ----------- | ----------------- | ------- |
| `&&`     | Logical AND | `true && true`    | `true`  |
| `\|\|`   | Logical OR  | `true \|\| false` | `true`  |
| `!`      | Logical NOT | `!true`           | `false` |

1. **Logical AND (`&&`)**: Returns true if both operands are true.

```javascript
true && true; // true
true && false; // false
```

2. **Logical OR (`||`)**: Returns true if at least one of the operands is true.

```javascript
true || false; // true
false || false; // false
```

3. **Logical NOT (`!`)**: Returns true if the operand is false, and false if the operand is true. It basically reverses the boolean value of the operand.

```javascript
!true; // false
!false; // true
```

These operators are often used in conditional statements to combine or invert boolean conditions. For example, you might use the logical AND operator (`&&`) to check that two conditions are both true before running a piece of code.

## Bitwise Operators

Bitwise operators operate on 32-bit binary representations of numbers:

| Operator | Description                  | Example   | Result |
| -------- | ---------------------------- | --------- | ------ |
| `&`      | Bitwise AND                  | `5 & 1`   | `1`    |
| `^`      | Bitwise XOR                  | `5 ^ 1`   | `4`    |
| `~`      | Bitwise NOT                  | `~5`      | `-6`   |
| `<<`     | Left shift                   | `5 << 1`  | `10`   |
| `>>`     | Sign-propagating right shift | `5 >> 1`  | `2`    |
| `>>>`    | Zero-fill right shift        | `5 >>> 1` | `2`    |

1. **Bitwise AND (`&`)**: Returns a one in each bit position where operands have ones.

```javascript
5 & 1; // 1 (0101 & 0001 => 0001)
```

2. **Bitwise OR (`|`)**: Returns a one in each bit position where at least one operand has a one.

```javascript
5 | 1; // 5 (0101 | 0001 => 0101)
```

3. **Bitwise XOR (`^`)**: Returns a one in each bit position where exactly one operand has a one.

```javascript
5 ^ 1; // 4 (0101 ^ 0001 => 0100)
```

4. **Bitwise NOT (`~`)**: Inverts the bits of its operand.

```javascript
~5; // -6 (~0101 => 1010)
```

5. **Left shift (`<<`)**: Shifts the bits of the first operand to the left by the number of places specified in the second operand. New bits get filled with zeros.

```javascript
5 << 1; // 10 (0101 << 1 => 1010)
```

6. **Sign-propagating right shift (`>>`)**: Shifts the bits of the first operand to the right by the number of places specified in the second operand. The sign bit is used to fill the new bits.

```javascript
5 >> 1; // 2 (0101 >> 1 => 0010)
```

7. **Zero-fill right shift (`>>>`)**: Shifts the bits of the first operand to the right by the number of places specified in the second operand. New bits get filled with zeros.

```javascript
5 >>> 1; // 2 (0101 >>> 1 => 0010)
```

These operators are less commonly used than the arithmetic, assignment, comparison, and logical operators, but they can be useful in certain scenarios, particularly in low-level programming tasks.

## Comments

To write comments in your code to explain what it does, leave notes for yourself or others, or to prevent execution of code:

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

The `console.log()` function is used to print output to the console. This can be very useful for debugging, as it allows you to output the values of variables at different points in your code, or to output messages that help you understand the flow of execution in your code.

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
