// ROUTER TEMPLATE FOR EXPRESS.JS
export const expressRouteTemplate = (name) => {
  return `
const router = require("express").Router();
const ${name.toLowerCase()}Controller = require("../controllers/${name.toLowerCase()}.controller");

router.get("/${name.toLowerCase()}", ${name.toLowerCase()}Controller.getAll);
router.get("/${name.toLowerCase()}/:id", ${name.toLowerCase()}Controller.getOne);
router.post("/${name.toLowerCase()}", ${name.toLowerCase()}Controller.createOne);
router.put("/${name.toLowerCase()}/:id", ${name.toLowerCase()}Controller.updateOne);
router.delete("/${name.toLowerCase()}/:id", ${name.toLowerCase()}Controller.deleteOne);

module.exports = router;`;
};

// MONGOOSE MODEL TEMPLATE FOR EXPRESS.JS
export const expressModelTemplate = (name) => {
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

module.exports = mongoose.model("${
    name.charAt(0).toUpperCase() + name.slice(1)
  }", ${name.charAt(0).toUpperCase() + name.slice(1)}Schema);`;
};

// CONTROLLER TEMPLATE FOR EXPRESS.JS
export const expressControllerTemplate = (name) => {
  const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
  return `const ${name} = require("../models/${name.toLowerCase()}.model");

module.exports = {
  // GET ALL DATA
  getAll: async (req, res) => {
    const ${name.toLowerCase()}s = await ${capitalName}.find();
    res.send(${name.toLowerCase()}s);
  },
  // GET ONE DATA
  getOne: async (req, res) => {
    const ${name.toLowerCase()} = await ${capitalName}.findOne({ _id: req.params.id });
    res.send(${name.toLowerCase()})
  },
  // CREATE DATA
  createOne: async (req,res) => {
    const new${capitalName} = new ${capitalName}(req.body)
    await new${capitalName}.save()
    res.send(new${capitalName})
  },
  // UPDATE DATA
  updateOne: async (req, res) => {
    const ${name.toLowerCase()} = await ${capitalName}.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    res.send(${name.toLowerCase()})
  },
  // DELETE DATA
  deleteOne: async (req, res) => {
    const ${name.toLowerCase()} = await ${capitalName}.findByIdAndRemove(req.params.id);
    res.send(${name.toLowerCase()});
  },
};
`;
};
