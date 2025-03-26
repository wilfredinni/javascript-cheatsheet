---
title: Javascript Map Object - Javascript Cheatsheet
description: A Map is a built in object that holds key-value pairs. It can hold a key of any data type unlike in plain objects. It maintains the insertion order and provides helpers to manage key-value pairs.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Map Object
</base-title>

<base-disclaimer>
  <base-disclaimer-title>
    Javascript Map Object
  </base-disclaimer-title>
  <base-disclaimer-content>
    A Map is a built in object that holds key-value pairs. It can hold a key of any data type unlike in plain objects. It maintains the insertion order and provides helpers to manage key-value pairs.
  </base-disclaimer-content>
</base-disclaimer>

## Creating a Map

Creates an empty `Map` instance.

```javascript
const map = new Map()
```

## Initializing a Map

You can initialize a Map with an array of key-value pairs.

```javascript
const map = new Map([
  ['id', 1], // key: 'id', value: 1
  ['name', 'Alice'], // key: 'name', value: 'Alice'
])
```

## Map Size

`size` property returns the number of key-value pairs in a map.
It returns a number.

```javascript
map.size // 2
```

## Map Set

The `set(key, value)` method adds a key-value pair.
If a key exists already, the value will be updated.
`set()` affects the size of a map.

```javascript
map.set('age', 50) // sets new key 'age' with value 50
map.set(2, 200) // sets new key 2 with value 200
map.set('id', 2) // id key already exists, so value of id will be updated to 2

// Check size
map.size // 4
```

You can also chain `set` like `map.set(key, value).set(key, value)`

## Map Get

The `get(key)` retrieves the value of the specified key.
If a key exists, its value will be returned otherwise undefined.

```javascript
map.get('age') // 50
map.get('none') // undefined as key 'none' do not exist
```

## Map Has

The `has(key)` returns a boolean by checking the key existence.

```javascript
map.has('id') // true
map.has('none') // false
```

## Map Delete

The `delete(key)` method removes the key-value pair with the specified key.
It returns true if the key exists, otherwise false.
`delete()` affects the size of a map.

```javascript
map.delete('age') // true as key 'age' exists
map.delete('none') // false as key 'none' do not exist

// Check size
map.size //  3
```

## Map Clear

The `clear` method removes all key-value pairs from the map.
`clear` affects the size of a map.

```javascript
map.clear()

// Check size
map.size // 0
```

## Iterate Map using for ... of

You can directly iterate using `for ... of` over each key-value pair.

```javascript
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (const [key, value] of map) {
  console.log(`${key}: ${value}`)
}

// name: Bob
// age: 20
```

## Iterate Map using keys()

You can iterate over the map keys using `keys()` method as in the order it was inserted.

```javascript
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (const key of map.keys()) {
  console.log(`${key}`)
}

// name
// age
```

## Iterate Map using values()

You can iterate over the map values using `values()` method as in the order it was inserted.

```javascript
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (const value of map.values()) {
  console.log(`${value}`)
}

// Bob
// 20
```

## Iterate Map using entries()

You can iterate over the map's key-value pair using `entries()` method as in the order it was inserted.

```javascript
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (let [key, value] of map.entries()) {
  console.log(`${key}: ${value}`)
}

// name: Bob
// age: 20
```
