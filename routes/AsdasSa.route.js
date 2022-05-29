
const router = require("express").Router();
const asdassaController = require("../controller/asdassa.controller");

router.get("/asdassa", asdassaController.getAll);
router.get("/asdassa/:id", asdassaController.getOne);
router.post("/asdassa", asdassaController.create);
router.put("/asdassa/:id", asdassaController.updateOne);
router.delete("/asdassa/:id", asdassaController.deleteOne);

module.exports = router;

