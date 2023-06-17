import { exec } from "child_process";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
import generateCRUD from "../crud/index.js";
import templates from "../src/templates.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 7000;
const fastify = Fastify();

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
  //   constraints: { host: "example.com" }, // optional: default {}
});

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});

fastify.get("/", (req, reply) => {
  // generateCRUD("expressjs", "new");
  reply.sendFile("index.html");
});

/**
 * Generate Project
 */
fastify.post("/generate-project", (req, reply) => {
  const { library, projname } = req.body;
  const templatesMap = {
    expressjs: templates.javascript.express.none.link,
    expressts: templates.typescript.express.none.link,
    expressjs_mongo:
      templates.javascript.express["mongodb (mongoose)"].auth.link,
    expressts_mongo:
      templates.typescript.express["mongodb (mongoose)"].auth.link,
    fastifyjs: templates.javascript.fastify.none.link,
    fastifyts: templates.typescript.fastify.none.link,
    fastifyjs_mongo:
      templates.javascript.fastify["mongodb (mongoose)"].auth.link,
    fastifyts_mongo:
      templates.typescript.fastify["mongodb (mongoose)"].auth.link,
  };
  exec(
    `npx degit ${templatesMap[library]} ${projname} --force`,
    (error, stdout, output) => {
      if (error) {
        reply.status(500).send(error);
        console.log(error);
      }
      console.log("Generated Project");
      reply.send({ msg: "Generated the project successfully" });
    }
  );
});

/**
 * Start Ngenly GUI server
 */
export const startGUIserver = () => {
  return () => {
    exec("nodemon ./gui/server.js");
  };
};
