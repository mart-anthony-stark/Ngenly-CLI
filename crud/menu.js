#!/usr/bin/env node

import colors from "colors";
import inquirer from "inquirer";
import generateProject from "../src/generator.js";
import generateCRUD from "./index.js";

const menu = [
  {
    name: "generateType",
    type: "list",
    message: "What do you want to generate?",
    choices: ["project", "crud"],
  },
];

const generateCrudMenu = () => {
  inquirer.prompt(crudMenu).then(({ library, name }) => {
    generateCRUD(library, name);
  });
};

const executions = {
  project: generateProject,
  crud: generateCrudMenu,
};

export const generateMenu = () => {
  inquirer.prompt(menu).then((ans) => {
    const { generateType } = ans;
    executions[generateType.toLowerCase()]();
  });
};

const crudMenu = [
  {
    name: "library",
    type: "list",
    message: "What library are you using?",
    choices: ["expressjs", "expressts"],
  },
  {
    name: "name",
    type: "input",
    message: "Model name (will be the name of route and controller)",
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
];
