// insert the index
function insertIndex(div, title) {
  for (let item in title) {
    const index = `<a href="">${title[item].innerText}</a>`;
    div.insertAdjacentHTML("beforeend", index);
  }
}

// function to push the h2 and h3 to a new array
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

// function to replace spaces (" ") for "-"
function replace(item) {
  return item.innerText.replace(/\s/g, "-");
}

function createIndex() {
  const index = document.getElementById("index");
  const h2 = document.getElementsByTagName("h2");
  let h2Array = [];
  pushArray(h2, h2Array);
  insertIndex(index, h2Array);
  const links = index.querySelectorAll("a");
  replaceAddHref(links);
}

export { createIndex };