---
title: Javascript String Manipulation - Javascript Cheatsheet
description: String manipulation refers to the process of changing, parsing, slicing, or analyzing strings in various ways.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript String Manipulation
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    Manipulating Strings
  </base-disclaimer-title>
  <base-disclaimer-content>
    String manipulation refers to the process of changing, parsing, slicing, or analyzing strings in various ways.
  </base-disclaimer-content>
</base-disclaimer>

## Concat

The `concat` method is used to join two or more strings together. This method does not change the existing strings, but returns a new string containing the text of the joined strings.

```javascript
let str1 = "Hello, ";
let str2 = "World!";
let result = str1.concat(str2);

console.log(result); // Outputs: "Hello, World!"
```

`str1` and `str2` are two strings. The `concat` method is called on `str1` with `str2` as the argument, resulting in a new string that is the concatenation of `str1` and `str2`. The new string is stored in the `result` variable.

## CharAt

`charAt` method is used to get the character at a specific index in a string. The index of the first character is 0, the second character is 1, and so on.

```javascript
let str = "Hello, World!";
let char = str.charAt(7);

console.log(char); // Outputs: "W"
```

Here, `str` is a string. The `charAt` method is called on `str` with 7 as the argument, which corresponds to the 8th character in the string (since the index is 0-based). The character at this index is "W", so "W" is stored in the `char` variable and then logged to the console.

## Includes

The `includes` method is used to determine whether one string can be found within another string, returning true or false as appropriate. It performs a case-sensitive search.

```javascript
let str = "Hello, World!";
let result = str.includes("World");

console.log(result); // Outputs: true
```

`str` is a string. The `includes` method is called on `str` with "World" as the argument. Since "World" is a substring of `str`, the `includes` method returns true, which is stored in the `result` variable and then logged to the console.

## IndexOf

`indexOf` method is used to determine the first occurrence of a specified value in a string. It returns the index of the value if found, or -1 if the value is not found. The search is case-sensitive.

```javascript
let str = "Hello, World!";
let index = str.indexOf("World");

console.log(index); // Outputs: 7
```

`str` is a string. The `indexOf` method is called on `str` with "World" as the argument. Since "World" is a substring of `str` and starts at index 7, the `indexOf` method returns 7, which is stored in the `index` variable and then logged to the console.

## Slice

The `slice` method is used to extract a section of a string and returns it as a new string, without modifying the original string. The method takes two parameters: the start index (inclusive), and the end index (exclusive).

```javascript
let str = "Hello, World!";
let slicedStr = str.slice(7, 12);

console.log(slicedStr); // Outputs: "World"
```

Here, `str` is a string. The `slice` method is called on `str` with 7 as the start index and 12 as the end index. This extracts the substring starting from the 8th character up to (but not including) the 13th character. The resulting substring "World" is stored in the `slicedStr` variable and then logged to the console.

## Split

The `split` method is used to divide a string into an array of substrings. It takes a separator as an argument, which specifies the character(s) to use for separating the string. If the separator is not provided, the entire string will be returned as a single element in an array.

```javascript
let str = "Hello, World!";
let array = str.split(", ");

console.log(array); // Outputs: ["Hello", "World!"]
```

`str` is a string. The `split` method is called on `str` with ", " as the separator. This divides the string into two substrings "Hello" and "World!", which are returned as elements in an array. The array is stored in the `array` variable and then logged to the console.

## Replace

The `replace` method is used to replace a specified value with another value in a string. It returns a new string with some or all matches of a pattern replaced by a replacement. The original string is not modified.

```javascript
let str = "Hello, World!";
let newStr = str.replace("World", "Universe");

console.log(newStr); // Outputs: "Hello, Universe!"
```

`str` is a string. The `replace` method is called on `str` with "World" as the pattern to be replaced and "Universe" as the replacement. This results in a new string "Hello, Universe!", which is stored in the `newStr` variable and then logged to the console.

## ToLowerCase

The `toLowerCase` method is used to convert a string to lowercase letters. This method does not change the original string, but returns a new string where all the uppercase characters are converted to lowercase.

```javascript
let str = "Hello, World!";
let lowerCaseStr = str.toLowerCase();

console.log(lowerCaseStr); // Outputs: "hello, world!"
```

`str` is a string. The `toLowerCase` method is called on `str`, resulting in a new string where all the uppercase characters are converted to lowercase. The new string is stored in the `lowerCaseStr` variable and then logged to the console.

## ToUpperCase

The `toUpperCase` method is used to convert a string to uppercase letters. This method does not change the original string, but returns a new string where all the lowercase characters are converted to uppercase.

Here's an example of how to use the `toUpperCase` method:

```javascript
let str = "Hello, World!";
let upperCaseStr = str.toUpperCase();

console.log(upperCaseStr); // Outputs: "HELLO, WORLD!"
```

`str` is a string. The `toUpperCase` method is called on `str`, resulting in a new string where all the lowercase characters are converted to uppercase. The new string is stored in the `upperCaseStr` variable and then logged to the console.

## Trim

The `trim` method is used to remove whitespace from both ends of a string. This method does not change the original string, but returns a new string with the whitespace removed.

```javascript
let str = "   Hello, World!   ";
let trimmedStr = str.trim();

console.log(trimmedStr); // Outputs: "Hello, World!"
```

`str` is a string with leading and trailing whitespace. The `trim` method is called on `str`, resulting in a new string where the whitespace at both ends is removed. The new string is stored in the `trimmedStr` variable and then logged to the console.

## TrimLeft and TrimRight

`trimLeft` and `trimRight` methods are used to remove whitespace from the beginning and end of a string respectively. These methods do not change the original string, but return a new string with the whitespace removed.

```javascript
let str = "   Hello, World!   ";
let trimmedLeftStr = str.trimLeft();
let trimmedRightStr = str.trimRight();

console.log(trimmedLeftStr); // Outputs: "Hello, World!   "
console.log(trimmedRightStr); // Outputs: "   Hello, World!"
```

In this example, `str` is a string with leading and trailing whitespace. The `trimLeft` method is called on `str`, resulting in a new string where the whitespace at the beginning is removed. Similarly, the `trimRight` method is called on `str`, resulting in a new string where the whitespace at the end is removed. The new strings are stored in the `trimmedLeftStr` and `trimmedRightStr` variables and then logged to the console.
