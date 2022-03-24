const mongoose = require("mongoose");

const SecretSchema = new mongoose.Schema(
	{
		hash: {
			type: String,
			required: true,
		},
		secretText: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
		},
		expiresAt: {
			type: Date,
		}
	}
);

SecretSchema.index( { "expiresAt": 1 }, { expireAfterSeconds: 0 } )

module.exports = mongoose.model("secret", SecretSchema);
