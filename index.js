#!/usr/bin/env node

import { argv } from "process";
import { createRequire } from "module";
import colors from "colors";
const require = createRequire(import.meta.url);
const version = require("./package.json").version;
import generateProject from "./src/generator.js";
// const generateCRUD = require('./crud/index.js')
import generateCRUD from "./crud/index.js";
import { generateMenu } from "./crud/menu.js";

const greeting = ` _   _                  _       
| \ | |                | |      
|  \| | __ _  ___ _ __ | |_   _ 
| . \` |/ _\` |/ _ \ '_ \| | | | |
| |\  | (_| |  __/ | | | | |_| |
\_| \_/\__, |\___|_| |_|_|\__, |
        __/ |              __/ |
       |___/              |___/ `;

const flag = argv[2];

console.log(greeting.yellow);

if (flag === "-v" || flag === "--version") {
  console.log("Ngenly CLI version: ".red + version.cyan);
  console.log("Created by Mart Anthony Salazar".red);
  console.log("https://github.com/mart-anthony-stark".cyan);
} else if (flag === "new") {
  // Generating new project
  generateProject();
} else if (flag === "-g" || flag === "generate") {
  if (argv.length == 3) {
    // Generate menu
    generateMenu();
  } else if (!argv[3] || !argv[4] || !argv[5]) {
    console.log("Invalid arguments.".red);
    console.log(
      "Usage: ngenly -g [crud] [library: express | fastify] [route_name]".yellow
    );
  } else {
    if (argv[3] == "crud") {
      generateCRUD(argv[4], argv[5]);
    }
  }
} else {
  console.log(`Unknown flag: ${flag}`.red);
  console.log("\nUsage: ".yellow + "ngenly [flag]".cyan);
  console.log("Commands: ".yellow);
  console.log(
    "\tngenly new".magenta + "                           generates a new project".blue
  );
  console.log(
    "\tngenly [-g | generate]".magenta +
      "               starts generating project or crud using menu".blue
  );
  console.log(
    "\tngenly -v".magenta + "                            returns cli version".blue
  );
  console.log(
    "\tngenly --version".magenta +
      "                     returns cli version".blue
  );
  console.log(
    "\tngenly -g [crud] [library] [name]".magenta +
      "    generates crud files (Model, Controller, Router)".blue
  );
}
