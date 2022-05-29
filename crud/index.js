import fs from "fs";
import path from "path";
import { expressRouteTemplate, expressModelTemplate, expressControllerTemplate } from "./templates.js";

const __dirname = path.resolve(path.dirname(""));
const generateCRUD = (library, name) => {
  generateFile("route", name, expressRouteTemplate(name));
  generateFile("model", name, expressModelTemplate(name));
  generateFile("controller", name, expressControllerTemplate(name));
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
