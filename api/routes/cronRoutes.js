const express = require("express");
const router = express.Router();
const { statusCheck } = require("../controllers/croncycles");

router.post("/statusCheck", statusCheck);
module.exports = router;