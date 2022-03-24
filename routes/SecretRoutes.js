const express = require("express");
const router = express.Router();
const { addSecret, getSecretByHash } = require("../controllers/SecretController");

router.post("/", addSecret);
router.get("/:hash", getSecretByHash);

module.exports = router;
