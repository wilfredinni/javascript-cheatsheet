/* --------------------------------------------------- */
/* Insert the index menu, add the anchor links and ids */
/* --------------------------------------------------- */

// insert the index
function insertIndex(div, title) {
  for (let item in title) {
    const index = `<li><a href="">${title[item].innerText}</a></li>`;
    div.insertAdjacentHTML("beforeend", index);
  }
}

// push the h2 and h3 to a new array
function pushArray(array, newArray) {
  for (let item of array) {
    newArray.push(item);
  }
}

// add the hrefs for the index
function replaceAddHref(array) {
  for (let item of array) {
    item.href = `#${replace(item)}`;
  }
}

// add the ids for the jumps
function replaceAddId(array) {
  for (let item of array) {
    item.id = replace(item);
  }
}

// function to replace spaces (" ") for "-"
function replace(item) {
  return item.innerText.replace(/\s/g, "-");
}

function createIndex() {
  // push and insert the toc
  const index = document.getElementById("index");
  const h2 = document.getElementsByTagName("h2");
  let h2Array = [];
  pushArray(h2, h2Array);
  insertIndex(index, h2Array);

  // add the links and ids
  const links = index.querySelectorAll("a");
  replaceAddHref(links);
  replaceAddId(h2);
}

export {
  createIndex
};