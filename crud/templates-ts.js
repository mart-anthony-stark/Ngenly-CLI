// ROUTER TEMPLATE FOR EXPRESS.JS
export const expressTSControllerTemplate = (name) => {
  const controllerName = `${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Controller`;
  return `import { Router } from "express";
import ${name.toLowerCase()}Controller from "./${name.toLowerCase()}.service";
const ${controllerName} = Router();

${controllerName}.get("/", ${name.toLowerCase()}Controller.getAll);
${controllerName}.get("/:id", ${name.toLowerCase()}Controller.getOne);
${controllerName}.post("/", ${name.toLowerCase()}Controller.createOne);
${controllerName}.put("/:id", ${name.toLowerCase()}Controller.updateOne);
${controllerName}.delete("/:id", ${name.toLowerCase()}Controller.deleteOne);

export default ${controllerName};`;
};

// MONGOOSE MODEL TEMPLATE FOR EXPRESS.JS
export const expressTSModelTemplate = (name) => {
  return `import { Schema, Types, model } from "mongoose";

const ${name.charAt(0).toUpperCase() + name.slice(1)}Schema = new Schema(
    {
      // title: {
      //   type: String,
      //   required: true,
      // },
      // body: {
      //   type: String,
      //   required: true,
      // },
    },
    { timestamps: true }
  );

export const ${name.charAt(0).toUpperCase() + name.slice(1)}Model = model("${
    name.charAt(0).toUpperCase() + name.slice(1)
  }", ${name.charAt(0).toUpperCase() + name.slice(1)}Schema);
`;
};

// Service TEMPLATE FOR EXPRESS.JS
export const expressTSServiceTemplate = (name) => {
  const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
  return `import type { Request, Response } from "express";
import {Handler, Service} from "../../utils/decorators"
import {${capitalName}Model} from "./${name.toLowerCase()}.model";

@Service
class ${capitalName}Service {
  // GET ALL DATA
  @Handler()
  async getAll (req:Request, res:Response) {
    const ${name.toLowerCase()}s = await ${capitalName}Model.find();
    res.send(${name.toLowerCase()}s);
  }
  // GET ONE DATA
  @Handler()
  async getOne (req:Request, res:Response) {
    const ${name.toLowerCase()} = await ${capitalName}Model.findOne({ _id: req.params.id });
    res.send(${name.toLowerCase()})
  }
  // CREATE DATA
  @Handler()
  async createOne (req:Request,res:Response) {
    const new${capitalName} = new ${capitalName}Model(req.body)
    await new${capitalName}.save()
    res.send(new${capitalName})
  }
  // UPDATE DATA
  @Handler()
  async updateOne (req:Request, res:Response) {
    const ${name.toLowerCase()} = await ${capitalName}Model.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(${name.toLowerCase()})
  }
  // DELETE DATA
  @Handler()
  async deleteOne (req:Request, res:Response) {
    const ${name.toLowerCase()} = await ${capitalName}Model.findByIdAndRemove(req.params.id);
    res.send(${name.toLowerCase()});
  }
};

export default new ${capitalName}Service();
`;
};
