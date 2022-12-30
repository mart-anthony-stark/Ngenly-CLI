#!/usr/bin/env node

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url);
import colors from "colors";
import { argv } from "process";
import generateCRUD from "../crud/index.js";
import { generateMenu } from "../crud/menu.js";
const pjson = require("../package.json");

export const help = () => {
  console.log("\nCommands: ".yellow);
  console.log(
    "\tngenly new".magenta +
      "                           generates a new project".blue
  );
  console.log(
    "\tngenly [-g | generate]".magenta +
      "               starts generating project or crud using menu".blue
  );
  console.log(
    "\tngenly -v".magenta +
      "                            returns cli version".blue
  );
  console.log(
    "\tngenly --version".magenta +
      "                     returns cli version".blue
  );
  console.log(
    "\tngenly -g [crud] [library] [name]".magenta +
      "    generates crud files (Model, Controller, Router)".blue
  );
};

export const versionCmd = () => {
  console.log(pjson.version.cyan);
};

export const generateCmd = () => {
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
};
