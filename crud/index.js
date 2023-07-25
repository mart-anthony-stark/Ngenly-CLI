import fs from "fs";
import path from "path";
import {
  expressRouteTemplate,
  expressModelTemplate,
  expressControllerTemplate,
  fastifyjsRouteTemplate,
  fastifyjsModelTemplate,
  fastifyControllerTemplate,
} from "./templates-js.js";

import {
  expressTSControllerTemplate,
  expressTSModelTemplate,
  expressTSRouteTemplate,
} from "./templates-ts.js";
import colors from "colors";
import { createModel } from "../helper/mongoose-helper.js";
import Loader from "../src/loader.js";
import { greeting } from "../index.js";

const loader = new Loader();
const templates = {
  expressjs: {
    route: expressRouteTemplate,
    model: expressModelTemplate,
    controller: expressControllerTemplate,
  },
  expressts: {
    route: expressTSRouteTemplate,
    model: expressTSModelTemplate,
    controller: expressTSControllerTemplate,
  },
  fastifyjs: {
    route: fastifyjsRouteTemplate,
    model: fastifyjsModelTemplate,
    controller: fastifyControllerTemplate,
  },
};

const __dirname = path.resolve(path.dirname(""));

/**
 *
 * @param {String} library
 * @param {String} name
 * @returns void
 */
const generateCRUD = async (library, name, isAuto) => {
  // CHECKS IF CRUD TEMPLATES FOR LIBRARY SELECTED IS VALID
  if (!templates[library]) {
    console.log("Invalid library selection".red);
    console.log("Available library templates:".green);
    for (let lib in templates) {
      console.log(`\t- ${lib}`.blue);
    }
    return;
  }

  console.log(greeting.yellow);

  const routeTemplate = templates[library]["route"];
  const modelTemplate = templates[library]["model"];
  const controllerTemplate = templates[library]["controller"];
  const ext = library.slice(library.length - 2);

  // Generate files
  generateFile("route", name, routeTemplate(name), ext);

  // Check if arg automatic schema generation
  if (isAuto) {
    const modelTxt = await createModel(name);
    generateFile("model", name, modelTxt, ext);
  } else {
    generateFile("model", name, modelTemplate(name), ext);
  }

  generateFile("controller", name, controllerTemplate(name), ext);
  addRouteToMain(name, ext, library);
  addRoutesToDocumentation(name);
};

/**
 *
 * @param {String} dir
 * @param {String} name
 * @param {String} content
 * @param {String} extension
 *
 * @description Generates a file and logs the details
 */
const generateFile = (dir, name, content, extension) => {
  // Directory mapping for each ext (js/ts)
  const dirMap = {
    js: "app",
    ts: `src/app`,
  };
  const dirToBeCreated =
    __dirname + `/${dirMap[extension]}/${name.toLowerCase()}`;

  fs.mkdir(dirToBeCreated, { recursive: true }, (err) => {
    if (err) throw err;

    fs.writeFile(
      `${dirToBeCreated}/${name.toLowerCase()}.${dir}.${extension}`,
      content,
      function (err) {
        if (err) throw err;
        console.log(
          "CREATE".bgGreen +
            " " +
            name +
            " " +
            dir.toUpperCase().blue +
            " - " +
            new Date().toISOString().yellow
        );
      }
    );
  });
};

/**
 *
 * @param {String} name
 * @param {String} ext
 * @param {String} library
 *
 * @description Adds the created router to app entry point middleware.
 */
const addRouteToMain = (name, ext, library) => {
  const resourceName = name.toLowerCase();
  const mainAppendString = {
    expressjs: `app.use("/${resourceName}", require("./app/${resourceName}/${resourceName}.route"));`,
    expressts: `
import ${resourceName}Router from "./app/${resourceName}/${resourceName}.route";
app.use("/${resourceName}", ${resourceName}Router);`,
    fastifyjs: `
    fastify.register(require("./routes/${resourceName}.route"), { prefix: "/${resourceName}" });
    `,
  };

  let filename = ext == "ts" ? "./src/app.ts" : "server.js";
  if (library === "fastifyjs") {
    // FASTIFY JS - INDEX.JS
    fs.appendFile("index.js", mainAppendString[library], () => {
      console.log("APPEND".bgBlue + " " + name + " " + "ROUTE".blue);
    });
  } else {
    fs.appendFile(filename, mainAppendString[library], () => {
      console.log("APPEND".bgBlue + " " + name + " " + "ROUTE".blue);
    });
  }
};

const addRoutesToDocumentation = (name) => {
  const routesDocu = `
  
## ${name} routes
- GET      = /${name}
- GET      = /${name}/:id
- POST     = /${name}
- PUT      = /${name}/:id
- DELETE   = /${name}/:id`;

  fs.appendFile("README.md", routesDocu, () => {
    console.log(
      "APPEND".bgBlue + " " + name + " " + "ROUTE DOCUMENTATION".blue
    );
  });
};

export default generateCRUD;
