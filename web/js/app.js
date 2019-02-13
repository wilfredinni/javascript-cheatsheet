import fs from "fs";
// import "mini.css";
import "bulma";
import "../css/style.css";
import * as showdown from "showdown";
import {
  createIndex
} from "./toc";

const converter = new showdown.Converter({
  tables: true
});

// the cheatsheet div
const cheatsheetDiv = document.getElementById("cheatsheet");

// load the cheatsheet, convert and insert
// const cheatsheet = fs.readFileSync(__dirname + "/../../README.md", "utf8");
const cheatsheet = fs.readFileSync(__dirname + "/README.md", "utf8");
const cheatHtml = converter.makeHtml(cheatsheet);
cheatsheetDiv.insertAdjacentHTML("beforebegin", cheatHtml);

// create the index
createIndex();