const Secret = require("../models/Secret");
const crypto = require("crypto");

// @desc    Create a new secret
// @route   POST /api/v1/secret
// @access  Public
const addSecret = async (req, res) => {
  const { secret, expireAfter } = req.body;
  if (!secret || !expireAfter) {
    return res.status(405).json({ errors: [{ msg: "Invalid input" }] });
  }
  const hash = crypto.createHash("md5").update(secret).digest("hex");
  const date = new Date().toISOString();
  const expiredDate =
    expireAfter > 0
      ? new Date(new Date(date).getTime() + expireAfter * 1000).toISOString()
      : null;
  const newSecret = await Secret.create({
    hash: hash,
    secretText: secret,
    createdAt: date,
    expiresAt: expiredDate,
  });

  await newSecret.save();

  if (newSecret) {
    res.status(200).json({
      _id: newSecret._id,
      hash: newSecret.hash,
      secretText: newSecret.secretText,
      createdAt: newSecret.createdAt,
      expiresAt: newSecret.expiresAt,
      message: "Successfully created secret",
    });
  } else {
    return res.status(405).json({ errors: [{ msg: "Invalid input" }] });
  }
};

// @desc    Get secrets
// @route   GET /api/v1/secret/
// @access  Public
const getSecrets = async (req, res) => {
    const findSecret = await Secret.find();
  
    if (findSecret) {
      res.status(200).json({
        data: findSecret,
        message: "Successfully fetched secrets",
      });
    } else {
      return res.status(404).json({ errors: [{ msg: "Secret not found" }] });
    }
  };

// @desc    Find a secret by hash
// @route   GET /api/v1/secret/:hash
// @access  Public
const getSecretByHash = async (req, res) => {
  const hash = req.params.hash;
  const findSecret = await Secret.findOne({ hash: hash });

  if (findSecret) {
    res.status(200).json({
      _id: findSecret._id,
      hash: findSecret.hash,
      secretText: findSecret.secretText,
      createdAt: findSecret.createdAt,
      expiresAt: findSecret.expiresAt,
      message: "Successfully fetched secret",
    });
  } else {
    return res.status(404).json({ errors: [{ msg: "Secret not found" }] });
  }
};

module.exports = { addSecret, getSecrets, getSecretByHash };
