import fs from "fs";
import path from "path";
import { routeTemplate } from "./templates.js"

const __dirname = path.resolve(path.dirname(""));
const generateCRUD = (library, name) => {
    generateRoute(name)
};

const generateRoute = (name) => {
  fs.mkdir(__dirname + "/routes", { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(
      `${__dirname}/routes/${name.charAt(0).toUpperCase() + name.slice(1)}.route.js`,
      routeTemplate(name),
      function (err) {
        if (err) throw err;
      }
    );
  });
};

export default generateCRUD;
