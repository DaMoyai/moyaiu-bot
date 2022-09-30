const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "gamerrate",
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("gamerrate")
		.setDescription("me when moving colors on screen 😍")
		.addStringOption((option) =>
			option
				.setName("target")
				.setDescription("The target user")
				.setRequired(false)
		),
	execute(client, interaction) {
		var game = Math.floor(Math.random() * 100) + 1

		const u = {
			title: "Gamer Rate",
			description: `You are **${game}%** a gamer`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		const gaymer = {
			title: "Gamer Rate",
			description: `${interaction.options.getString(
				"target"
			)} is **${game}%** a gamer`,
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
