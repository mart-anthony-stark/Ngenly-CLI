// ROUTER TEMPLATE FOR EXPRESS.JS
export const expressTSRouteTemplate = (name) => {
  return `import { Router } from "express";
const ${name.toLowerCase()}Controller = require("../controllers/${name.toLowerCase()}.controller");
const router = Router();

router.get("/", ${name.toLowerCase()}Controller.getAll);
router.get("/:id", ${name.toLowerCase()}Controller.getOne);
router.post("/", ${name.toLowerCase()}Controller.createOne);
router.put("/:id", ${name.toLowerCase()}Controller.updateOne);
router.delete("/:id", ${name.toLowerCase()}Controller.deleteOne);

export default router;`;
};

// MONGOOSE MODEL TEMPLATE FOR EXPRESS.JS
export const expressTSModelTemplate = (name) => {
  return `const mongoose = require("mongoose");

const ${
  name.charAt(0).toUpperCase() + name.slice(1)
}Schema = new mongoose.Schema(
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

const model = mongoose.model("${
  name.charAt(0).toUpperCase() + name.slice(1)
}", ${name.charAt(0).toUpperCase() + name.slice(1)}Schema);
export default model;`;
};

// CONTROLLER TEMPLATE FOR EXPRESS.JS
export const expressTSControllerTemplate = (name) => {
  const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
  return `import { Request, Response } from "express";
import ${capitalName} from "../models/${name.toLowerCase()}.model";

module.exports = {
  // GET ALL DATA
  getAll: async (req:Request, res:Response) => {
    const ${name.toLowerCase()}s = await ${capitalName}.find();
    res.send(${name.toLowerCase()}s);
  },
  // GET ONE DATA
  getOne: async (req:Request, res:Response) => {
    const ${name.toLowerCase()} = await ${capitalName}.findOne({ _id: req.params.id });
    res.send(${name.toLowerCase()})
  },
  // CREATE DATA
  createOne: async (req:Request,res:Response) => {
    const new${capitalName} = new ${capitalName}(req.body)
    await new${capitalName}.save()
    res.send(new${capitalName})
  },
  // UPDATE DATA
  updateOne: async (req:Request, res:Response) => {
    const ${name.toLowerCase()} = await ${capitalName}.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(${name.toLowerCase()})
  },
  // DELETE DATA
  deleteOne: async (req:Request, res:Response) => {
    const ${name.toLowerCase()} = await ${capitalName}.findByIdAndRemove(req.params.id);
    res.send(${name.toLowerCase()});
  },
};
`;
};
