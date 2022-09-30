const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "gay",
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("gay")
		.setDescription("dont take this cmd as offense ")
		.addStringOption((option) =>
			option
				.setName("target")
				.setDescription("The target user")
				.setRequired(false)
		),
	execute(client, interaction) {
		var gae = Math.floor(Math.random() * 100) + 1
		const u = {
			title: "gay rate",
			description: `You're **${gae}%** gay`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		const gay = {
			title: "gay rate",
			description: `${interaction.options.getString(
				"target"
			)} is **${gae}%** gay`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		if (!interaction.options.getString("target")) {
			return interaction.reply({
				embeds: [u],
			})
		} else {
			interaction.reply({
				embeds: [gay],
			})
		}
	},
}
