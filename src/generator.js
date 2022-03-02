#!/usr/bin/env node

import colors from "colors";
import inquirer from "inquirer";
import templates from "./templates.js";
import download from "./downloader.js";

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
    name: "db",
    type: "list",
    message: "What database do you want to use?",
    choices: ["none", "mongodb (mongoose)"],
  },
];

const generateProject = () => {
  inquirer.prompt(questions).then(({ name, framework, lang, db }) => {
    let t = templates[lang][framework][db];
    if (db === "mongodb (mongoose)") {
      inquirer
        .prompt([
          {
            name: "auth",
            type: "confirm",
            message: "Do you want authentication functionalities? ",
          },
        ])
        .then((ans) => {
          if (ans.auth) {
            t =
              "https://github.com/mart-anthony-stark/Node-boilerplates#expressjs-mongoose-auth";
          }
          download(t, name);
        });
    }
  });
};

export default generateProject;
