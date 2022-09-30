const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "server",
	category: "Misc",
	data: new SlashCommandBuilder().setName("servers").setDescription("Links to the support server and emoji server!"),

	execute(client, interaction) {
		const { MessageButton, MessageActionRow } = require("discord.js")
		const a = new MessageButton().setLabel("Bot Server").setStyle("LINK").setURL("https://discord.gg/ts8wqxfSu8")

		const b = new MessageButton()
			.setLabel("Moyai Island")
			.setStyle("LINK")
			.setURL("https://discord.gg/mYf7UmhaVJ")
			// join ;)

		const btn = new MessageActionRow().addComponents([a, b])
		const embed = {
			url: "https://youtu.be/pzeoCgrQo90",
			title: "Servers",
			fields: [
				{
					name: "Official Bot server",
					value: "the official bot server\n link",
					inline: true,
				},
				{
					name: "Moyai Island",
					value: "The emotes used are here \nhttps://discord.gg/mYf7UmhaVJ",
					inline: true,
				},
			],
			color: "RANDOM",
			timestamp: new Date(),
		}
		interaction.reply({
			embeds: [embed],
			components: [btn],
			ephemeral: true,
		})
	},
}
