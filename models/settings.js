const mongoose = require("mongoose")
const settingsSchema = new mongoose.Schema({
	guildID: {
		type: String,
		unique: false,
		require: true,
	},
	socialcredit: {
		type: Boolean,
		default: false,
	},
	level: {
		type: Boolean,
		default: false,
	},
	// unused entry to disable commands
	disabled: {
		type: Object,
	},
})

// We export it as a mongoose model.
module.exports = mongoose.model("settings", settingsSchema)
