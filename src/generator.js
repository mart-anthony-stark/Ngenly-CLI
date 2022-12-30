#!/usr/bin/env node

import colors from "colors";
import inquirer from "inquirer";
import templates from "./templates.js";
import download from "./downloader.js";
import { greeting } from "../index.js";

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
    choices: ["express", "fastify"],
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
    choices: ["none", "mongodb (mongoose)", "mysql"],
  },
];

const generateProject = () => {
  console.log(greeting)
  inquirer.prompt(questions).then(({ name, framework, lang, db }) => {
    let t = templates[lang][framework][db];
    if (db !== "none") {
      inquirer
        .prompt([
          {
            name: "auth",
            type: "confirm",
            message: "Do you want authentication functionalities? ",
          },
        ])
        .then((ans) => {
          t = templates[lang][framework][db][`${ans.auth ? "auth" : "noauth"}`];
          download(t, name);
        });
      return;
    }
    download(t, name);
  });
};

export default generateProject;
