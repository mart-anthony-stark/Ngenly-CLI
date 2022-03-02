#!/usr/bin/env node

import { argv } from "process";
import { createRequire } from "module";
import colors from "colors";
const require = createRequire(import.meta.url);
const version = require("./package.json").version;
import generateProject from "./src/generator.js";

const flag = argv[2];
if (flag === "-v" || flag === "--version") {
  console.log("Ngenly CLI version: ".red + version.cyan);
  console.log("Created by Mart Anthony Salazar".red);
  console.log("https://github.com/mart-anthony-stark".cyan);
} else if (flag === "new") {
  generateProject();
} else {
  console.log(`Unknown flag: ${flag}`.red);
  console.log("ngenly [flag]".cyan);
  console.log("-v             returns cli version".blue);
  console.log("-version       returns cli version".blue);
  console.log("-new           generates a new project".blue);
}
