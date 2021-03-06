#!/usr/bin/env node

import { argv } from "process";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const version = require("./package.json").version;
import generateProject from "./src/generator.js";
import { generateCmd, help, versionCmd } from "./helper/commands.js";

const greeting = ` _   _                  _       
| \ | |                | |      
|  \| | __ _  ___ _ __ | |_   _ 
| . \` |/ _\` |/ _ \ '_ \| | | | |
| |\  | (_| |  __/ | | | | |_| |
\_| \_/\__, |\___|_| |_|_|\__, |
        __/ |              __/ |
       |___/              |___/ `;

const flag = argv[2].toLowerCase();

console.log(greeting.yellow);

const commandExecutions = {
  version: versionCmd,
  "-v": versionCmd,
  new: generateProject,
  "-n": generateProject,
  "-g": generateCmd,
  "-h": help,
  help: help,
};

const execute = commandExecutions[flag];
if (!execute) {
  console.log(`Unknown flag: ${flag}`.red);
  console.log("\nUsage: ".yellow + "ngenly [flag]".cyan);
  help();
} else {
  execute();
}
