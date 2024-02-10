---
title: Javascript Files and Directories - Javascript Cheatsheet
description:  JavaScript, running in a Node.js environment can interact with the file system using the built-in fs module.
---

<base-title :title="frontmatter.title" :description="frontmatter.description">
Javascript Files and Directories
</base-title>

To interact with the file system in JavaScript, you typically use the built-in `fs` (File System) module in Node.js.

<base-disclaimer>
  <base-disclaimer-title>
    <a href="https://nodejs.org/en" target="_blank">Node.js Environment</a>
  </base-disclaimer-title>
  <base-disclaimer-content>
    While running in a browser, Javascript doesn't have the permissions to directly interact with files and directories on a user's computer due to security restrictions. <b>The contents of this cheatsheet are intended for local use with a Node.js environment</b>.
  </base-disclaimer-content>
</base-disclaimer>

## Requirements

1. **Node.js Environment**: JavaScript by itself doesn't have the ability to interact with the file system for security reasons. However, Node.js, a JavaScript runtime built on Chrome's V8 JavaScript engine, provides this capability.

2. **FS Module**: The `fs` module in Node.js is used for interacting with the file system. It provides methods for reading files, creating files, updating files, deleting files, and renaming files.

3. **Async/Sync Operations**: The `fs` module provides both synchronous (blocking) and asynchronous (non-blocking) methods. It's generally recommended to use asynchronous methods for better performance, especially for IO-heavy operations.

4. **Error Handling**: When working with the file system, it's important to handle errors properly. This can be done using callbacks, promises, or async/await.

Here's a simple example of reading a file using the `fs` module:

```javascript
const fs = require('fs');

async function readFileAsync() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

readFileAsync();
```

`fs.readFile` is used to read the content of `example.txt`. Because `fs.readFile` returns a promise, you can use `await` to wait for the promise to resolve. If an error occurs while reading the file, it's caught by the `catch` block and logged to the console.

## Reading Files

Reading files in Node.js can be done using the `fs` module's `readFile` function. This is how you can do it using async/await:

```javascript
const fs = require('fs').promises;

async function readFileAsync

(filePath

) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

readFileAsync('example.txt');
```

`readFileAsync` reads a file at the given `filePath`. The `fs.readFile` function is used to read the file content. It returns a promise that resolves with the file content as a string. If an error occurs while reading the file, it's caught by the `catch` block and logged to the console.

## Writing Files

Writing files can be done using the `fs` module's `writeFile` function:

```javascript
const fs = require('fs').promises;

async function writeFileAsync(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log('File written successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

writeFileAsync('example.txt', 'Hello, World!');
```

The `writeFileAsync` function writes content to a file at the given `filePath`. The `fs.writeFile` function is used to write the content. It returns a promise that resolves when the file has been written. If an error occurs while writing the file, it's caught by the `catch` block and logged to the console.

## Updating Files

To update a file you can use the `appendFile` or `writeFile` function.

### Appending to a file

```javascript
const fs = require('fs').promises;

async function appendToFileAsync(filePath, content) {
  try {
    await fs.appendFile(filePath, content);
    console.log('File updated successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

appendToFileAsync('example.txt', ' More content');
```

The `appendToFileAsync` function appends content to a file at the given `filePath`. The `fs.appendFile` function is used to append the content. It returns a promise that resolves when the file has been updated. If an error occurs while updating the file, it's caught by the `catch` block and logged to the console.

### Overwriting a file

```javascript
const fs = require('fs').promises;

async function overwriteFileAsync(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    console.log('File updated successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

overwriteFileAsync('example.txt', 'New content');
```

`overwriteFileAsync` overwrites a file at the given `filePath` with new content. The `fs.writeFile` function is used to write the new content. It returns a promise that resolves when the file has been updated. If an error occurs while updating the file, it's caught by the `catch` block and logged to the console.

## Deleting Files

You can delete a file with the `unlink` function.

```javascript
const fs = require('fs').promises;

async function deleteFileAsync(filePath) {
  try {
    await fs.unlink(filePath);
    console.log('File deleted successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

deleteFileAsync('example.txt');
```

The `deleteFileAsync` function deletes a file at the given `filePath`. The `fs.unlink` function is used to delete the file. It returns a promise that resolves when the file has been deleted. If an error occurs while deleting the file, it's caught by the `catch` block and logged to the console.

## Renaming Files

The `rename` function allow you to rename a file.

```javascript
const fs = require('fs').promises;

async function renameFileAsync(old

Path

, newPath) {
  try {
    await fs.rename(oldPath, newPath);
    console.log('File renamed successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

renameFileAsync('oldName.txt', 'newName.txt');
```

`renameFileAsync` renames a file from `oldPath` to `newPath`. The `fs.rename` function is used to rename the file. It returns a promise that resolves when the file has been renamed. If an error occurs while renaming the file, it's caught by the `catch` block and logged to the console.

## Creating Directories

To create a directory, you can use the `mkdir` function.

```javascript
const fs = require('fs').promises;

async function createDirectoryAsync(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
    console.log('Directory created successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

createDirectoryAsync('exampleDir');
```

The `createDirectoryAsync` function creates a directory at the given `dirPath`. The `fs.mkdir` function is used to create the directory. The `recursive` option is set to `true` to create parent directories if they do not exist. It returns a promise that resolves when the directory has been created. If an error occurs while creating the directory, it's caught by the `catch` block and logged to the console.

## Reading Directories

You can read a directory by using the `readdir` function.

```javascript
const fs = require('fs').promises;

async function readDirectoryAsync(dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    console.log('Directory content:', files);
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

readDirectoryAsync('exampleDir');
```

`readDirectoryAsync` reads the content of a directory at the given `dirPath`. The `fs.readdir` function is used to read the directory content. It returns a promise that resolves with an array of filenames. If an error occurs while reading the directory, it's caught by the `catch` block and logged to the console.

## Deleting Directories

To delete a directory yo can use the `rmdir` function.

```javascript
const fs = require('fs').promises;

async function deleteDirectoryAsync(dirPath) {
  try {
    await fs.rmdir(dirPath);
    console.log('Directory deleted successfully');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

deleteDirectoryAsync('exampleDir');
```

The `deleteDirectoryAsync` function deletes a directory at the given `dirPath`. The `fs.rmdir` function is used to delete the directory. It returns a promise that resolves when the directory has been deleted. If an error occurs while deleting the directory, it's caught by the `catch` block and logged to the console.

<base-warning>
  <base-warning-title>
    Deleting Non-Empty Directories
  </base-warning-title>
  <base-warning-content>
    `fs.rmdir` only works on empty directories. If you want to delete a directory and all of its contents, you'll need to first delete the contents of the directory. This can be done using a library like `rimraf`, or by recursively deleting all files and subdirectories.
  </base-warning-content>
</base-warning>

## Deleting non Empty Directories

Deleting non-empty directories requires a recursive function that deletes all files and subdirectories within the directory before deleting the directory itself:

```javascript
const fs = require('fs').promises;
const path = require('path');

async function deleteDirectoryRecursive(dirPath) {
  if (dirPath === '/') {
    throw new Error("You are trying to delete the root directory, operation stopped.");
  }

  let entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (let entry of entries) {
    let fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await deleteDirectoryRecursive(fullPath);
    } else {
      await fs.unlink(fullPath);
    }
  }

  await fs.rmdir(dirPath);
  console.log(`Directory ${dirPath} has been deleted!`);
}

deleteDirectoryRecursive('exampleDir');
```

`deleteDirectoryRecursive` deletes a directory and all of its contents at the given `dirPath`. The `fs.readdir` function is used to read the directory content. If an entry is a directory, the function is called recursively. If an entry is a file, it's deleted using `fs.unlink`. Finally, the directory itself is deleted using `fs.rmdir`.

<base-warning>
  <base-warning-title>
    Caution
  </base-warning-title>
  <base-warning-content>
    This operation is potentially dangerous as it will permanently delete the specified directory and all of its contents. Always make sure that the path you provide does not contain any files or directories you want to keep.
  </base-warning-content>
</base-warning>

## Watching Files and Directories

Watching files and directories can be done using `watch` or `watchFile`.

```javascript
const fs = require('fs');

fs.watch('example.txt', (eventType, filename) => {
  console.log(`Event type is: ${eventType}`);
  if (filename) {
    console.log(`Filename provided: ${filename}`);
  } else {
    console.log('Filename not provided');
  }
});
```

`fs.watch` is used to watch changes in the file `example.txt`. The callback function is called when the file is accessed or modified. The `eventType` argument can be 'rename' or 'change', and the `filename` argument is the name of the file which triggered the event.

<base-warning>
  <base-warning-title>
    Platform and Situational Variability
  </base-warning-title>
  <base-warning-content>
    The exact behavior of `fs.watch` can vary across different platforms and situations. It's not always reliable, especially on network file systems and certain file systems like NFS and VFS. For more reliable file watching, consider using a library like `chokidar`.
  </base-warning-content>
</base-warning>

## Checking if a File or Directory Exists

Checking if a file or directory exists can be don with the `access` function or `fs.promises` API's `access` function.

```javascript
const fs = require('fs').promises;

async function checkExists(path) {
  try {
    await fs.access(path);
    console.log('The file or directory exists.');
  } catch {
    console.log('The file or directory does not exist.');
  }
}

checkExists('example.txt');
```

`checkExists` checks if a file or directory at the given `path` exists. The `fs.access` function is used to check for the existence of the file or directory. It returns a promise that resolves if the file or directory exists, and rejects if it does not.