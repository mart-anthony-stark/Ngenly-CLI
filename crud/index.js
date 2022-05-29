import fs from "fs";
import path from "path";
import {
  expressRouteTemplate,
  expressModelTemplate,
  expressControllerTemplate,
} from "./templates-js.js";
import colors from "colors";

const templates = {
  expressjs: {
    route: expressRouteTemplate,
    model: expressModelTemplate,
    controller: expressControllerTemplate,
  },
};

const __dirname = path.resolve(path.dirname(""));
const generateCRUD = (library, name) => {
  // CHECKS IF CRUD TEMPLATES FOR LIBRARY SELECTED IS VALID
  if (!templates[library]) {
    console.log("Invalid library selection".red);
    console.log("Available library templates:".green);
    console.log("\t- expressjs".blue);
    console.log("\t- expressts".blue);
    return;
  }

  const routeTemplate = templates[library]["route"];
  const modelTemplate = templates[library]["model"];
  const controllerTemplate = templates[library]["controller"];
  generateFile("route", name, routeTemplate(name));
  generateFile("model", name, modelTemplate(name));
  generateFile("controller", name, controllerTemplate(name));
};

const generateFile = (dir, name, content) => {
  fs.mkdir(__dirname + `/${dir}s`, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(
      `${__dirname}/${dir}s/${name.toLowerCase()}.${dir}.js`,
      content,
      function (err) {
        if (err) throw err;
      }
    );
  });
};

export default generateCRUD;
