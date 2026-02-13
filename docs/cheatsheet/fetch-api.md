---
title: Javascript Fetch API - Javascript Cheatsheet
description: The Fetch API provides an interface for fetching resources (including across the network). It is a more powerful and flexible replacement for XMLHttpRequest.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Fetch API
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    Fetch API
  </base-disclaimer-title>
  <base-disclaimer-content>
    The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global `fetch()` method that provides an easy, logical way to fetch resources asynchronously across the network.
  </base-disclaimer-content>
</base-disclaimer>

## Basic GET Request

The simplest use of `fetch()` takes one argument — the path to the resource you want to fetch — and returns a promise containing the response (a `Response` object).

```javascript
async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json();
  console.log(data);
}

getData();
```

Here, we are fetching a JSON object from a public API. We await the fetch call to get the response, and then await the `response.json()` method to parse the JSON body.

## Handling Text Responses

Sometimes you might want to fetch text instead of JSON. You can use the `text()` method for this.

```javascript
async function getText() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const text = await response.text();
  console.log(text);
}

getText();
```

## POST Request

To allow your script to modify data, you can send data to the server using the POST method. You need to provide a second argument to `fetch()`: an options object.

```javascript
async function postData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  
  const data = await response.json();
  console.log(data);
}

postData();
```

In this example:
- `method`: set to 'POST'.
- `body`: the data we want to send, converted to a JSON string.
- `headers`: specifying that we are sending JSON data.

## Checking for Success

The fetch promise only rejects on network failure. HTTP errors (like 404 or 500) validly resolve. You should check `response.ok` or `response.status`.

```javascript
async function checkStatus() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/invalid-id');
  
  if (!response.ok) {
    console.log('Network response was not ok:', response.status);
    return;
  }
  
  const data = await response.json();
  console.log(data);
}

checkStatus();
```

## Async/Await vs .then()

While valid to use `.then()`, modern JavaScript prefers `async/await` for cleaner code.

**Using .then():**

```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(err => console.error('Error:', err));
```

**Using Async/Await:**

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.error('Error:', err);
  }
}
```
