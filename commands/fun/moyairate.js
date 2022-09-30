const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "moyairate",
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("moyairate")
		.setDescription("unmoyai if under 100 !!!!")
		.addStringOption((option) => option.setName("target").setDescription("The target user").setRequired(false)),
	execute(client, interaction) {
		var game = Math.floor(Math.random() * 100) + 1

		const u = {
			title: "Moyai Rate",
			description: `You are **${game}%** moyai :moyai:`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		const gaymer = {
			title: "Moyai Rate",
			description: `${interaction.options.getString("target")} is **${game}%** moyai :moyai:`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		if (!interaction.options.getString("target")) {
			return interaction.reply({
				embeds: [u],
			})
		} else {
			interaction.reply({
				embeds: [gaymer],
			})
		}
	},
}
