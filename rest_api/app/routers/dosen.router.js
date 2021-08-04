const express = require("express");
const router = express.Router();
const controller = require("../controllers/dosen.controller");

router.post("/addOne", controller.addOne);
router.get("/", controller.findAll);
router.get("/:nid", controller.findByKey);
router.put("/updateByKey/:nid", controller.updateByKey);
router.delete("/deleteByKey/:nid", controller.deleteByKey);

module.exports = router;
