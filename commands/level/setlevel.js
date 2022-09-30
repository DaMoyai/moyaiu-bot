const { Permissions } = require("discord.js")
const Levels = require("discord-xp")

const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "setlevel",
	category: "Level",
	aliases: ["setlvl", "setrank"],
	usage: "setlevel <@user> <number>",
	description: "Set level",
	data: new SlashCommandBuilder()
		.setName("setlevel")
		.setDescription("Set level")
		.addIntegerOption((option) =>
			option
				.setName("level")
				.setDescription("The level to set")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(100)
		)
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("Select a user")
				.setRequired(true)
		),
	execute(client, interaction) {
		const noperm = {
			title: "Set Level",
			description:
				"You need the `Manage Server` permission to use this command",
			color: `#f04747`,
		}
		const error = {
			title: "Set Level",
			description: "Usage: `!setlevel <@user> <number>`",
			color: "#7289da",
		}
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD))
			return interaction.reply({ embeds: [noperm] })

		const target = interaction.options.getUser("target") // Grab the target.

		Levels.setLevel(
			target.id,
			interaction.guild.id,
			interaction.options.getInteger("level")
		)
		interaction.reply({
			embeds: [
				{
					title: "Set Level",
					description: `Changed ${target}'s level to ${interaction.options.getInteger(
						"level"
					)}`,
					color: "#7289da",
				},
			],
		})
	},
}
