// ROUTER TEMPLATE FOR EXPRESS.JS
export const expressRouteTemplate = (name) => {
  return `
const router = require("express").Router();
const ${name.toLowerCase()}Controller = require("../controller/${name.toLowerCase()}.controller");

router.get("/${name.toLowerCase()}", ${name.toLowerCase()}Controller.getAll);
router.get("/${name.toLowerCase()}/:id", ${name.toLowerCase()}Controller.getOne);
router.post("/${name.toLowerCase()}", ${name.toLowerCase()}Controller.create);
router.put("/${name.toLowerCase()}/:id", ${name.toLowerCase()}Controller.updateOne);
router.delete("/${name.toLowerCase()}/:id", ${name.toLowerCase()}Controller.deleteOne);

module.exports = router;

`;
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
  }", ${name.charAt(0).toUpperCase() + name.slice(1)}Schema);
  `;
};
