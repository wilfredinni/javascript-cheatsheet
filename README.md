# Javascript Cheatsheet

- [Javascript Cheatsheet](#javascript-cheatsheet)
  - [Comments](#comments)
  - [Data types](#data-types)
  - [Variables](#variables)
  - [Strings](#strings)
    - [Basics](#basics)
    - [Escape sequences](#escape-sequences)
    - [The length of a string](#the-length-of-a-string)
    - [Index of a String](#index-of-a-string)
  - [Arrays](#arrays)
    - [Index of an array](#index-of-an-array)
    - [Manipulate arrays with push, pop, shift and unshift](#manipulate-arrays-with-push-pop-shift-and-unshift)
    - [Accessing Nested Arrays](#accessing-nested-arrays)
  - [JavaScript Objects](#java-script-objects)
    - [Accessing Objects Properties](#accessing-objects-properties)
    - [Modifying Objects Properties](#modifying-objects-properties)
    - [Objects for Lookups](#objects-for-lookups)
    - [Test Object Properties](#test-object-properties)
    - [Accessing Nested Objects](#accessing-nested-objects)
  - [Booleans](#booleans)
  - [If Else Statements](#if-else-statements)
    - [Else Statement](#else-statement)
    - [Else if statement](#else-if-statement)
    - [Conditional (Ternary) Operator](#conditional-ternary-operator)
    - [Multiple Conditional (Ternary) Operators](#multiple-conditional-ternary-operators)
  - [Switch Statement](#switch-statement)
    - [Default in Switch Statement](#default-in-switch-statement)
    - [Multiple Options with Switch Statement](#multiple-options-with-switch-statement)
  - [Comparison Operators](#comparison-operators)
  - [While Loops](#while-loops)
    - [Do...While Loops](#do-while-loops)
  - [For Loops](#for-loops)
  - [Functions](#functions)
    - [Function Arguments](#function-arguments)
    - [Return Statement](#return-statement)


## Comments

```javascript
// This is an in-line comment.

/* This is a
multi-line comment */
```

## Data types

JavaScript provides seven different data types which are:

| Data Types |
| ---------- |
| undefined  |
| null       |
| boolean    |
| string     |
| symbol     |
| number     |  
| object     |

## Variables

```javascript
// declare a variable
var ourName;

// store values
myNumber = 5;
myString = 'myVar';

// declare variables with the assignment operator
var myNum = 0;

// add substract, multiply and divide numbers
myVar = 5 + 10; // assigned 15
myVar = 12 - 6; // assigned 6
myVar = 13 * 13; // assigned 169
myVar = 16 / 2; // assigned 8

// increment and decrement numbers
i++; // is the equivalent of i = i + 1
i--; // is the equivalent of i = i - 1;

// decimals
var ourDecimal = 5.7; // float
```

## Strings

### Basics

```javascript
// escape literal cuotes
var sampleStr = "Alan said, \"Peter is learning JavaScript\".";
// this prints: Alan said, "Peter is learning JavaScript".

// concatenating strings 
var ourStr = "I come first. " + "I come second.";

// concatenating strings with +=
var ourStr = "I come first. ";
ourStr += "I come second.";

// constructing strings with variables
var ourName = "freeCodeCamp";
var ourStr = "Hello, our name is " + ourName + ", how are you?";

// appending variables to strings
var anAdjective = "awesome!";
var ourStr = "freeCodeCamp is ";
ourStr += anAdjective;
```

### Escape sequences

| Code| Output         |
| ----| ---------------|
| \'  | single quote   |
| \"  | double quote   |
| \\  | backslash      |
| \n  | newline        |
| \r  | carriage return|
| \t  | tab            |
| \b  | backspace      |
| \f  | from feed      |

### The length of a string

```javascript
"Alan Peter".length; // 10
```

### Index of a String

Most modern programming languages, like JavaScript, don't start counting at 1 like humans do. They start at 0. This is referred to as Zero-based indexing.

```javascript
var firstLetterOfFirstName = "";
var firstName = "Ada";
firstLetterOfFirstName = firstName[0];

// find the las character of a string
var firstName = "Ada";
var lastLetterOfFirstName = firstName[firstName.length - 1];
```

## Arrays

```javascript
var sandwich = ["peanut butter", "jelly", "bread"]

// nested arrays
[["Bulls", 23], ["White Sox", 45]]
```

### Index of an array

```javascript
var ourArray = [50,60,70];
var ourData = ourArray[0]; // equals 50

// modify an array with indexes
var ourArray = [50,40,30];
ourArray[0] = 15; // equals [15,40,30]

// access multi-dimensional arrays with indexes
var arr = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [[10,11,12], 13, 14]
];
arr[3]; // equals [[10,11,12], 13, 14]
arr[3][0]; // equals [10,11,12]
arr[3][0][1]; // equals 11
```

### Manipulate arrays with push, pop, shift and unshift

```javascript
// push() to append data to the end of an array
var arr = [1,2,3];
arr.push(4); // arr is now [1,2,3,4]

// pop() to "pop" a value off of the end of an array
var threeArr = [1, 4, 6];
var oneDown = threeArr.pop();
console.log(oneDown); // Returns 6
console.log(threeArr); // Returns [1, 4]

// shift() removes the first element of an array
var ourArray = [1, 2, [3]];
var removedFromOurArray = ourArray.shift();
// removedFromOurArray now equals 1 and ourArray now equals [2, [3]].

// unshift() adds the element at the beginning of the array
var ourArray = ["Stimpson", "J", "cat"];
ourArray.shift(); // ourArray now equals ["J", "cat"]
ourArray.unshift("Happy"); // ourArray now equals ["Happy", "J", "cat"]
```

### Accessing Nested Arrays

```javascript
var ourPets = [
  {
    animalType: "cat",
    names: [
      "Meowzer",
      "Fluffy",
      "Kit-Cat"
    ]
  },
  {
    animalType: "dog",
    names: [
      "Spot",
      "Bowser",
      "Frankie"
    ]
  }
];
ourPets[0].names[1]; // "Fluffy"
ourPets[1].names[0]; // "Spot"
```

## JavaScript Objects

```javascript
var cat = {
  "name": "Whiskers",
  "legs": 4,
  "tails": 1,
  "enemies": ["Water", "Dogs"]
};
```

### Accessing Objects Properties

Accessing with dot (`.`) notation

```javascript
var myObj = {
  prop1: "val1",
  prop2: "val2"
};
var prop1val = myObj.prop1; // val1
var prop2val = myObj.prop2; // val2
```

Accessing with bracket (`[]`) notation

```javascript
var myObj = {
  "Space Name": "Kirk",
  "More Space": "Spock",
  "NoSpace": "USS Enterprise"
};
myObj["Space Name"]; // Kirk
myObj['More Space']; // Spock
myObj["NoSpace"]; // USS Enterprise
```

Accessing with variables

```javascript
var dogs = {
  Fido: "Mutt", Hunter: "Doberman", Snoopie: "Beagle"
};
var myDog = "Hunter";
var myBreed = dogs[myDog];
console.log(myBreed); // "Doberman"
```

### Modifying Objects Properties

```javascript
// Updating object properties
var ourDog = {
  "name": "Camper",
  "legs": 4,
  "tails": 1,
  "friends": ["everything!"]
};

ourDog.name = "Happy Camper"; // or
ourDog["name"] = "Happy Camper";

// add new properties
ourDog.bark = "bow-wow"; // or
ourDog["bark"] = "bow-wow";

// delete properties
delete ourDog.bark;
```

### Objects for Lookups

```javascript
var alpha = {
  1:"Z",
  2:"Y",
  3:"X",
  4:"W",
  ...
  24:"C",
  25:"B",
  26:"A"
};
alpha[2]; // "Y"
alpha[24]; // "C"

var value = 2;
alpha[value]; // "Y"
```

### Test Object Properties

```javascript
var myObj = {
  top: "hat",
  bottom: "pants"
};
myObj.hasOwnProperty("top"); // true
myObj.hasOwnProperty("middle"); // false
```

### Accessing Nested Objects

```javascript
var ourStorage = {
  "desk": {
    "drawer": "stapler"
  },
  "cabinet": {
    "top drawer": {
      "folder1": "a file",
      "folder2": "secrets"
    },
    "bottom drawer": "soda"
  }
};
ourStorage.cabinet["top drawer"].folder2; // "secrets"
ourStorage.desk.drawer; // "stapler"
```

## Booleans

Booleans may only be one of two values: true or false. They are basically little on-off switches, where true is "on" and false is "off". These two states are mutually exclusive.

```javascript
true
false
```

## If Else Statements

```javascript
if (condition is true) {
  statement is executed
}
```

### Else Statement

```javascript
if (num > 10) {
  return "Bigger than 10";
} else {
  return "10 or Less";
}
```

### Else if statement

```javascript
if (num > 15) {
  return "Bigger than 15";
} else if (num < 5) {
  return "Smaller than 5";
} else {
  return "Between 5 and 15";
}
```

### Conditional (Ternary) Operator

```javascript
// this if statement...
function findGreater(a, b) {
  if(a > b) {
    return "a is greater";
  }
  else {
    return "b is greater";
  }
}

// is equivalent to this ternary operator
function findGreater(a, b) {
  return a > b ? "a is greater" : "b is greater";
}
```

### Multiple Conditional (Ternary) Operators

```javascript
// this if statement...
function findGreaterOrEqual(a, b) {
  if(a === b) {
    return "a and b are equal";
  }
  else if(a > b) {
    return "a is greater";
  }
  else {
    return "b is greater";
  }
}

// is equivalent to this ternary operator
function findGreaterOrEqual(a, b) {
  return (a === b) ? "a and b are equal" : (a > b) ? "a is greater" : "b is greater";
}
```

## Switch Statement

```javascript
switch(num) {
  case value1:
    statement1;
    break;
  case value2:
    statement2;
    break;
...
  case valueN:
    statementN;
    break;
}
```

### Default in Switch Statement

```javascript
switch (num) {
  case value1:
    statement1;
    break;
  case value2:
    statement2;
    break;
...
  default:
    defaultStatement;
    break;
}
```

### Multiple Options with Switch Statement

```javascript
switch(val) {
  case 1:
  case 2:
  case 3:
    result = "1, 2, or 3";
    break;
  case 4:
    result = "4 alone";
}
```

## Comparison Operators

| Operator | Meaning               |
| -------- | --------------------- |
| `==`     | Equality              |
| `===`    | Strict Equality       |
| `!=`     | Inequality            |
| `!==`    | Strict Inequality     |
| `>`      | Greater Than          |
| `>=`     | Greater or Equal Than |
| `<`      | Less Than             |
| `<=`     | Less or Equal Than    |
| `&&`     | And                   |
| `||`     | Or                    |

## While Loops

```javascript
var ourArray = [];
var i = 0;
while(i < 5) {
  ourArray.push(i);
  i++;
}
```

### Do...While Loops

```javascript
var ourArray = [];
var i = 0;
do {
  ourArray.push(i);
  i++;
} while (i < 5);
```

## For Loops

```javascript
var ourArray = [];
var i = 0;
while(i < 5) {
  ourArray.push(i);
  i++;
}

// Count Backwards With a For Loop
var ourArray = [];
for (var i=10; i > 0; i-=2) {
  ourArray.push(i);
}

// Iterate Through an Array
var arr = [10,9,8,7,6];
for (var i = 0; i < arr.length; i++) {
   console.log(arr[i]);
}

// Nested for loops
var arr = [
  [1,2], [3,4], [5,6]
];
for (var i=0; i < arr.length; i++) {
  for (var j=0; j < arr[i].length; j++) {
    console.log(arr[i][j]);
  }
}
```

## Functions

```javascript
function functionName() {
  console.log("Hello World");
}

// you can call it now
functionName();
```

### Function Arguments

```javascript
function ourFunctionWithArgs(a, b) {
  console.log(a - b);
}
ourFunctionWithArgs(10, 5); // Outputs 5
```

### Return Statement

```javascript
function plusThree(num) {
  return num + 3;
}
var answer = plusThree(5); // 8
```

