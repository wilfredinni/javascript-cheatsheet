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

```javascript run
const map = new Map()
console.log(map.size)
```

## Initializing a Map

You can initialize a Map with an array of key-value pairs.

```javascript run
const map = new Map([
  ['id', 1], // key: 'id', value: 1
  ['name', 'Alice'], // key: 'name', value: 'Alice'
])
console.log(map.size)
```

## Map Size

`size` property returns the number of key-value pairs in a map.
It returns a number.

```javascript run
const map = new Map([
  ['id', 1],
  ['name', 'Alice'],
])
console.log(map.size)
```

## Map Set

The `set(key, value)` method adds a key-value pair.
If a key exists already, the value will be updated.
`set()` affects the size of a map.

```javascript run
const map = new Map([
  ['id', 1],
  ['name', 'Alice'],
])
map.set('age', 50)
map.set(2, 200)
map.set('id', 2)

console.log(map.size)
```

You can also chain `set` like `map.set(key, value).set(key, value)`

## Map Get

The `get(key)` retrieves the value of the specified key.
If a key exists, its value will be returned otherwise undefined.

```javascript run
const map = new Map([
  ['id', 1],
  ['name', 'Alice'],
  ['age', 50],
])
console.log(map.get('age'))
console.log(map.get('none'))
```

## Map Has

The `has(key)` returns a boolean by checking the key existence.

```javascript run
const map = new Map([
  ['id', 1],
  ['name', 'Alice'],
])
console.log(map.has('id'))
console.log(map.has('none'))
```

## Map Delete

The `delete(key)` method removes the key-value pair with the specified key.
It returns true if the key exists, otherwise false.
`delete()` affects the size of a map.

```javascript run
const map = new Map([
  ['id', 1],
  ['name', 'Alice'],
  ['age', 50],
  [2, 200],
])
console.log(map.delete('age'))
console.log(map.delete('none'))
console.log(map.size)
```

## Map Clear

The `clear` method removes all key-value pairs from the map.
`clear` affects the size of a map.

```javascript run
const map = new Map([
  ['id', 1],
  ['name', 'Alice'],
])
map.clear()
console.log(map.size)
```

## Iterate Map using for ... of

You can directly iterate using `for ... of` over each key-value pair.

```javascript run
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (const [key, value] of map) {
  console.log(`${key}: ${value}`)
}
```

## Iterate Map using keys()

You can iterate over the map keys using `keys()` method as in the order it was inserted.

```javascript run
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (const key of map.keys()) {
  console.log(`${key}`)
}
```

## Iterate Map using values()

You can iterate over the map values using `values()` method as in the order it was inserted.

```javascript run
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (const value of map.values()) {
  console.log(`${value}`)
}
```

## Iterate Map using entries()

You can iterate over the map's key-value pair using `entries()` method as in the order it was inserted.

```javascript run
const map = new Map()
map.set('name', 'Bob').set('age', 20)
for (let [key, value] of map.entries()) {
  console.log(`${key}: ${value}`)
}
```
