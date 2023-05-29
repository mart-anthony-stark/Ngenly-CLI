import { exec } from "child_process";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 7000;
const fastify = Fastify({ logger: true });

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
  //   exec(`ngenly -g crud expressjs post`);
  reply.sendFile("index.html");
});

/**
 * Start Ngenly GUI server
 */
export const startGUIserver = () => {
  return () => {
    exec("nodemon ./gui/server.js");
  };
};
