const express = require("express");
const router = express.Router();
const { addSecret, getSecretByHash, getSecrets } = require("../controllers/SecretController");

router.post("/", addSecret).get("/", getSecrets)
router.get("/:hash", getSecretByHash);

module.exports = router;
