const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "penis",
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("penissize")
		.setDescription("imagine small pp😂🤣😂🤣🤣🤣😂")
		.addStringOption((option) => option.setName("target").setDescription("The target user").setRequired(false)),
	execute(client, interaction) {
		var pp = ["=", "==", "===", "====", "=====", "======", "=======", "========", "=========", "=========="]
		var ppp = Math.floor(Math.random() * pp.length)
		const u = {
			title: "Penis Size",
			description: `Your pp \nB${pp[ppp]}D`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		const penis = {
			title: "Penis Size",
			description: `${interaction.options.getString("target")}'s pp \nB${pp[ppp]}D`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		if (!interaction.options.getString("target")) {
			return interaction.reply({
				embeds: [u],
			})
		} else {
			interaction.reply({
				embeds: [penis],
			})
		}
	},
}
