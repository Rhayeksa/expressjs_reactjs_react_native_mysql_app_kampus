const express = require("express");
const router = express.Router();
const controller = require("../controllers/mataKuliah.controller");

router.post("/addOne", controller.addOne);
router.get("/", controller.findAll);
router.get("/:kode", controller.findByKey);
router.put("/updateByKey/:kode", controller.updateByKey);
router.delete("/deleteByKey/:kode", controller.deleteByKey);

module.exports = router;
