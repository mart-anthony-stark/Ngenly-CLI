// ROUTER TEMPLATE FOR EXPRESS.JS
export const expressTSRouteTemplate = (name) => {
  return `import { Router } from "express";
import { catcher } from "../../utils";
import ${name.toLowerCase()}Controller from "./${name.toLowerCase()}.controller";
const router = Router();

router.get("/", catcher(${name.toLowerCase()}Controller.getAll));
router.get("/:id", catcher(${name.toLowerCase()}Controller.getOne));
router.post("/", catcher(${name.toLowerCase()}Controller.createOne));
router.put("/:id", catcher(${name.toLowerCase()}Controller.updateOne));
router.delete("/:id", catcher(${name.toLowerCase()}Controller.deleteOne));

export default router;`;
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

export const ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Model = mongoose.model("${name.charAt(0).toUpperCase() + name.slice(1)}", ${
    name.charAt(0).toUpperCase() + name.slice(1)
  }Schema);
`;
};

// CONTROLLER TEMPLATE FOR EXPRESS.JS
export const expressTSControllerTemplate = (name) => {
  const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
  return `import type { Request, Response } from "express";
import {${capitalName}Model} from "./${name.toLowerCase()}.model";

export default {
  // GET ALL DATA
  getAll: async (req:Request, res:Response) => {
    const ${name.toLowerCase()}s = await ${capitalName}Model.find();
    res.send(${name.toLowerCase()}s);
  },
  // GET ONE DATA
  getOne: async (req:Request, res:Response) => {
    const ${name.toLowerCase()} = await ${capitalName}Model.findOne({ _id: req.params.id });
    res.send(${name.toLowerCase()})
  },
  // CREATE DATA
  createOne: async (req:Request,res:Response) => {
    const new${capitalName} = new ${capitalName}Model(req.body)
    await new${capitalName}.save()
    res.send(new${capitalName})
  },
  // UPDATE DATA
  updateOne: async (req:Request, res:Response) => {
    const ${name.toLowerCase()} = await ${capitalName}Model.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(${name.toLowerCase()})
  },
  // DELETE DATA
  deleteOne: async (req:Request, res:Response) => {
    const ${name.toLowerCase()} = await ${capitalName}Model.findByIdAndRemove(req.params.id);
    res.send(${name.toLowerCase()});
  },
};
`;
};
