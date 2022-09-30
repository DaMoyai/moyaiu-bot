const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "invite",
	aliases: ["inv"],
	category: "Misc",
	usage: "invite",
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("invite me"),
	execute(client, interaction) {
		const b1 = new MessageButton()
			.setLabel("Recommended Invite")
			.setStyle("LINK")
			.setURL(
				"link with all permissions"
			)
		const b2 = new MessageButton()
			.setLabel("Safe Invite")
			.setStyle("LINK")
			.setURL(
				"link with minimal, non-destructive perms"
			)
		const btn = new MessageActionRow().addComponents([b1, b2])

		const embeds = new MessageEmbed()
			.setURL("https://youtu.be/pzeoCgrQo90")
			.setTitle("Invite")
			.setColor("RANDOM")
			.setFields(
				{
					name: "Recommended Invite",
					value: "a",
				},
				{
					name: "Safe Invite (Limited)",
					value: "a",
				}
			)
		interaction.reply({
			embeds: [embeds],
			components: [btn],
			ephemeral: true,
		})
	},
}
