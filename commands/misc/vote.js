const { MessageActionRow, MessageButton } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "vote",
	category: "Misc",
	data: new SlashCommandBuilder()
		.setName("vote")
		.setDescription("vote on top.gg for rewards i guess"),
	execute(client, interaction) {
		const b1 = new MessageButton()
			.setLabel("Top.gg")
			.setStyle("LINK")
			.setURL("https://top.gg/bot/0/vote")
		const btn = new MessageActionRow().addComponents([b1])

		const pain = {
			url: "https://youtu.be/pzeoCgrQo90",
			title: "Vote",
			color: "RANDOM",
			fields: [
				{
					name: "Top.gg Vote Rewards",
					value: "<a:xp:879673649739739206> 30% XP Boost",
				},
			],
			timestamp: new Date(),
		}
		interaction.reply({
			embeds: [pain],
			components: [btn],
			ephemeral: true,
		})
	},
}
