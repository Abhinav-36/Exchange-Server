const express = require("express");
const router = express.Router();

const controller = require("../Controller/controllers");

router.get("/currencies", controller.getCurrencies);
router.get("/convert", controller.getConversion);

module.exports = router;
