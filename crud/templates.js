export const routeTemplate = (name) => {
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
