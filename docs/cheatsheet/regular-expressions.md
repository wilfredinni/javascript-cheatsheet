---
title: Javascript Regular Expressions - Javascript Cheatsheet
description: Often abbreviated as regex or regexp, are sequences of characters that form a search pattern.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Regular Expressions
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    From the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions">MDN web docs</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
   Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the exec() and test() methods of RegExp, and with the match(), matchAll(), replace(), replaceAll(), search(), and split() methods of String. This chapter describes JavaScript regular expressions.
  </base-disclaimer-content>
</base-disclaimer>

## Regular Expression Symbols

| Symbol   | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `.`      | Matches any character except newline                                         |
| `\d`     | Matches any digit (0-9)                                                      |
| `\D`     | Matches any non-digit character                                              |
| `\s`     | Matches any whitespace character                                             |
| `\S`     | Matches any non-whitespace character                                         |
| `\w`     | Matches any alphanumeric character (a-z, A-Z, 0-9) and underscore (_)        |
| `\W`     | Matches any non-alphanumeric character                                       |
| `[abc]`  | Matches any character inside the brackets (a, b, or c)                       |
| `[^abc]` | Matches any character not inside the brackets                                |
| `^`      | Matches the start of the string                                              |
| `$`      | Matches the end of the string                                                |
| `*`      | Matches zero or more occurrences of the preceding element                    |
| `+`      | Matches one or more occurrences of the preceding element                     |
| `?`      | Matches zero or one occurrence of the preceding element                      |
| `{n}`    | Matches exactly n occurrences of the preceding element                       |
| `{n,}`   | Matches n or more occurrences of the preceding element                       |
| `{n,m}`  | Matches at least n and at most m occurrences of the preceding element        |
| `\|`     | Acts as a boolean OR. Matches the pattern before or the pattern after the \| |
| `( )`    | Defines a group                                                              |
| `(?: )`  | Defines a non-capturing group                                                |
| `(?= )`  | Positive lookahead                                                           |
| `(?! )`  | Negative lookahead                                                           |

<base-disclaimer>
  <base-disclaimer-title>
    Complex Patterns
  </base-disclaimer-title>
  <base-disclaimer-content>
    Please note that following examples are simple examples and regular expressions can be combined to create more complex patterns.
  </base-disclaimer-content>
</base-disclaimer>

## Dot (.)

Matches any character except newline.

```javascript
let regex = /a.c/;
let str = 'abc';
console.log(regex.test(str)); // true
```

## Digit (\d)

Matches any digit (0-9).

```javascript
let regex = /\d/;
let str = 'abc123';
console.log(regex.test(str)); // true
```

## Non-Digit (\D)

Matches any non-digit character.

```javascript
let regex = /\D/;
let str = 'abc123';
console.log(regex.test(str)); // true
```

## Whitespace (\s)

Matches any whitespace character.

```javascript
let regex = /\s/;
let str = 'abc def';
console.log(regex.test(str)); // true
```

## Non-Whitespace (\S)

Matches any non-whitespace character.

```javascript
let regex = /\S/;
let str = ' abc';
console.log(regex.test(str)); // true
```

## Word Character (\w)

Matches any alphanumeric character (a-z, A-Z, 0-9) and underscore (_).

```javascript
let regex = /\w/;
let str = 'abc';
console.log(regex.test(str)); // true
```

## Non-Word Character (\W)

Matches any non-alphanumeric character.

  ```javascript
  let regex = /\W/;
  let str = 'abc-def';
  console.log(regex.test(str)); // true
  ```

## Character Set ([abc])

Matches any character inside the brackets (a, b, or c).

```javascript
let regex = /[abc]/;
let str = 'defabc';
console.log(regex.test(str)); // true
```

## Negated Character Set ([^abc])

Matches any character not inside the brackets.

```javascript
let regex = /[^abc]/;
let str = 'defabc';
console.log(regex.test(str)); // true
```

## Start Anchor (^)

Matches the start of the string.

```javascript
let regex = /^abc/;
let str = 'abcdef';
console.log(regex.test(str)); // true
```

## End Anchor ($)

Matches the end of the string.

```javascript
let regex = /def$/;
let str = 'abcdef';
console.log(regex.test(str)); // true
```

## Zero or More (*):** Matches zero or more occurrences of the preceding element.

```javascript
let regex = /a*/;
let str = 'aaaabc';
console.log(regex.test(str)); // true
```

## One or More (+)

Matches one or more occurrences of the preceding element.

```javascript
let regex = /a+/;
let str = 'aaaabc';
console.log(regex.test(str)); // true
```

## Zero or One (?)

Matches zero or one occurrence of the preceding element.

```javascript
let regex = /a?/;
let str = 'abc';
console.log(regex.test(str)); // true
```

## Exactly N ({n})

Matches exactly n occurrences of the preceding element.

```javascript
let regex = /a{2}/;
let str = 'aaaabc';
console.log(regex.test(str)); // true
```

## N or More ({n,})

Matches n or more occurrences of the preceding element.

```javascript
let regex = /a{2,}/;
let str = 'aaaabc';
console.log(regex.test(str)); // true
```

## Between N and M ({nm})

Matches at least n and at most m occurrences of the preceding element.

```javascript
let regex = /a{2,3}/;
let str = 'aaaabc';
console.log(regex.test(str)); // true
```

## OR (|)

Acts as a boolean OR. Matches the pattern before or the pattern after the `|`.

```javascript
let regex = /abc|def/;
let str1 = 'abc';
let str2 = 'def';
console.log(regex.test(str1)); // true
console.log(regex.test(str2)); // true
```

## Grouping (()

Defines a group.

```javascript
let regex = /(abc)/;
let str = 'abcdef';
console.log(regex.test(str)); // true
```

## Non-Capturing Group ((?: ))

Defines a non-capturing group.

```javascript
let regex = /(?:abc)/;
let str = 'abcdef';
console.log(regex.test(str)); // true
```

Sure, here is the continuation from item 21:

## Positive Lookahead ((?= ))

Positive lookahead.

```javascript
let regex = /abc(?=def)/;
let str = 'abcdef';
console.log(regex.test(str)); // true
```

## Negative Lookahead ((?! ))

Negative lookahead.

```javascript
let regex = /abc(?!def)/;
let str = 'abcghi';
console.log(regex.test(str)); // true
```
