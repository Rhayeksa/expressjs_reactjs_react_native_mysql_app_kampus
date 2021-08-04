const express = require("express");
const router = express.Router();
const controller = require("../controllers/hasilStudy.controller");

router.post("/addOne", controller.addOne);
router.get("/", controller.findAll);
router.get("/:kode", controller.findByKey);
router.put("/updateByKey/:kode/:mataKuliahKode", controller.updateByKey);
router.delete("/deleteByKey/:kode/:mataKuliahKode", controller.deleteByKey);

module.exports = router;
