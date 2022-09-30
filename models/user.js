const mongoose = require("mongoose")

const economySchema = new mongoose.Schema({
	userID: {
		type: String,
		unique: true,
		require: true,
	},
	socialcredit: {
		type: Number,
		default: 1000,
	},
})

module.exports = mongoose.model("economy", economySchema)
