---
title: Javascript Date and Time - Javascript Cheatsheet
description: JavaScript `Date` objects represent a single moment in time in a platform-independent format.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Date and Time
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    Date Objects
  </base-disclaimer-title>
  <base-disclaimer-content>
    JavaScript `Date` objects represent a single moment in time in a platform-independent format. `Date` objects contain a `Number` that represents milliseconds since 1 January 1970 UTC.
  </base-disclaimer-content>
</base-disclaimer>

## Creating a Date

There are four ways to create a new date object:

1. **New Date()**: Creates a new date object with the current date and time.

```javascript run
const now = new Date();
console.log(now);
```

2. **Date(milliseconds)**: Creates a new date object as zero time plus milliseconds.

```javascript run
// 0 milliseconds after Jan 01 1970
const d = new Date(0);
console.log(d);
```

3. **Date(dateString)**: Creates a new date object from a date string.

```javascript run
const d = new Date("October 13, 2014 11:13:00");
console.log(d);
```

4. **Date(year, month, ...)**: Creates a new date object with a specified date and time.  
   Note: JavaScript counts months from 0 to 11 (January = 0, December = 11).

```javascript run
// year, month, day, hour, minute, second, millisecond
const d = new Date(2018, 11, 24, 10, 33, 30, 0);
console.log(d);
```

## Get Methods

Use these methods to get information from a date object.

```javascript run
const d = new Date("2021-03-25");

console.log(d.getFullYear());
console.log(d.getMonth());
console.log(d.getDate());
console.log(d.getDay());
console.log(d.getHours());
console.log(d.getTime());
```

## Set Methods

Use these methods to set a part of a date object.

```javascript run
const d = new Date();
d.setFullYear(2020);
d.setMonth(11);
d.setDate(25);
console.log(d);
```

## Date.now()

`Date.now()` returns the number of milliseconds since January 1, 1970 00:00:00 UTC.

```javascript run
const start = Date.now();

// do something...
for (let i = 0; i < 100000; i++) {}

const end = Date.now();
console.log(`Elapsed time: ${end - start} ms`);
```

## Formatting Dates

JavaScript provides a built-in object `Intl.DateTimeFormat` for language-sensitive date and time formatting.

```javascript run
const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));

// US English
console.log(new Intl.DateTimeFormat('en-US').format(date));

// British English
console.log(new Intl.DateTimeFormat('en-GB').format(date));

// Korean
console.log(new Intl.DateTimeFormat('ko-KR').format(date));
```

## Date Calculations

Since dates are just numbers (milliseconds) under the hood, you can perform math on them.

```javascript run
const date1 = new Date('2022-01-01');
const date2 = new Date('2022-01-02');

// Difference in milliseconds
const diffTime = Math.abs(date2 - date1);

// Convert to days
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

console.log(diffDays + " days");
```
