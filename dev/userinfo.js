//! unfinished

const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
module.exports = {
	name: "userinfo",
	category: "Misc",
	data: new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("get information about a user")
		.addUserOption((option) =>
			option.setName("user").setDescription("funny vine boom sussy 69 moments description").setRequired(false)
		),
	execute(client, interaction) {
		console.log(interaction.member.user)
		const noUser = new MessageEmbed()
			.setURL("https://youtu.be/be337mef4XA")
			.setTitle(`${interaction.member.user.username}#${interaction.member.user.discriminator}`)
			.setFields({
				name: "banner",
				value: `${interaction.member.user.banner}`,
			})
			.setColor("RANDOM")

		if (interaction.member.user.username.toLowerCase().includes("moyai")) {
			noUser.setURL("https://youtu.be/vkpYIvL_B5I")
		}

		if (!interaction.options.getUser("user")) {
			return interaction.reply({
				embeds: [noUser],
			})
		} else {
			interaction.reply({
				embeds: [embeds2],
			})
		}
	},
}
