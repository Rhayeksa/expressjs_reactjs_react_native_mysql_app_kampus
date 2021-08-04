const express = require("express");
const router = express.Router();
const controller = require("../controllers/mahasiswa.controller");

router.post("/addOne", controller.addOne);
router.get("/", controller.findAll);
router.get("/:nim", controller.findByKey);
router.put("/updateByKey/:nim", controller.updateByKey);
router.delete("/deleteByKey/:nim", controller.deleteByKey);

module.exports = router;
