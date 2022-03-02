#!/usr/bin/env node

import colors from "colors";
import inquirer from "inquirer";

const questions = [
  {
    name: "name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "framework",
    type: "list",
    message: "What framework you want to use?",
    choices: ["express"],
  },
  {
    name: "lang",
    type: "list",
    message: "Language: ",
    choices: ["javascript", "typescript"],
  },
  {
    name: "template",
    type: "list",
    message: "What database do you want to use?",
    choices: ["none", "mongodb (mongoose)"],
  },
];

const generateProject = () => {
  inquirer.prompt(questions).then((ans) => {
    console.log(ans);
  });
};

export default generateProject;
