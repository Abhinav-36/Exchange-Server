const express = require("express");
const router = express.Router();

const routes = require("./currencies");

router.use("/exchange", routes);

module.exports = router;
