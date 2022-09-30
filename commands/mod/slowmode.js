const parse = require("parse-duration")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "slowmode",
	category: "Mod",
	perms: ["MANAGE_CHANNELS"],
	botPerms: ["MANAGE_CHANNELS"],
	data: new SlashCommandBuilder()
		.setName("slowmode")
		.setDescription("Change the slowmode for the current channel")
		.addStringOption((option) => option.setName("time").setDescription("the time").setRequired(true)),
	execute(client, interaction) {
		const { Permissions } = require("discord.js")
		const noperm = {
			title: "Slowmode",
			description: "You dont have permissions to use this command",
			color: "#f04747",
			timestamp: new Date(),
		}
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS))
			return interaction.reply({
				embeds: [noperm],
				ephemeral: true,
			})
		const notvalid = {
			title: "Slowmode",
			description: "Enter a valid duration",
			color: "#f04747",
			timestamp: new Date(),
		}
		if (!interaction.options.getString("time"))
			return interaction.reply({
				embeds: [notvalid],
			})
		const time = parse(`${interaction.options.getString("time")}`, "s")
		const nonum = {
			title: "Slowmode",
			description: "this is not a number",
			color: "#f04747",
			timestamp: new Date(),
		}
		if (isNaN(time))
			return interaction.reply({
				embeds: [nonum],
			})
		if (Math.round(parseInt(time)) < 0 || Math.round(parseInt(time)) > 21600)
			return interaction.reply({
				ephemeral: true,
				embeds: [notvalid],
			})
		const sucess = {
			title: "Slowmode",
			description: `Changed slowmode to **${interaction.options.getString("time")}**`,
			color: "RANDOM",
			timestamp: new Date(),
		}
		interaction.channel.setRateLimitPerUser(time)
		interaction.reply({
			embeds: [sucess],
			ephemeral: true,
		})
	},
}
