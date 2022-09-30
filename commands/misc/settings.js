const { SlashCommandBuilder } = require("@discordjs/builders")
const settings = require("../../models/settings.js")
const { MessageEmbed, MessageButton } = require("discord.js")
const { Permissions } = require("discord.js")
const { Interaction } = require("discord.js")

module.exports = {
	name: "settings",
	category: "Misc",
	cooldown: 60,
	perms: ["MANAGE_GUILD"],
	data: new SlashCommandBuilder()
		.setName("settings")
		.setDescription("settings")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("show")
				.setDescription("see the current settings")
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("edit")
				.setDescription("edit the server settings")
				.addStringOption(
					(option) =>
						option
							.setName("option")
							.setDescription("The option")
							.addChoices({name: "Level System", value: "level"}, {name: "Moyai Credit", value:"socialcredit"})
							.setRequired(true)

					//	.addChoice("DJ Mode", "dj")
				)
				.addBooleanOption((option) =>
					option
						.setName("toggle")
						.setDescription("hi")
						.setRequired(true)
				)
		),

	async execute(client, interaction, userData, guildData) {
		const option = interaction.options.getString("option")
		const toggle = interaction.options.getBoolean("toggle")

		if (interaction.options.getSubcommand() === "edit") {
			if (option === "socialcredit") {
				await settings.findOneAndUpdate(
					{
						guildID: interaction.guild.id,
					},
					{
						$set: {
							socialcredit: toggle,
						},
					}
				)
				const ä = new MessageEmbed()
					.setTitle("Edit Settings")
					.setDescription(
						`${
							guildData.moyaicredit ? "Disabled" : "Enabled"
						} Moyai Credit`
					)
					.setColor("#7289da")
				interaction.reply({
					ephemeral: true,
					embeds: [ä],
				})
			} else if (option === "level") {
				await settings.findOneAndUpdate(
					{
						guildID: interaction.guild.id,
					},
					{
						$set: {
							level: toggle,
						},
					}
				)
				const ö = new MessageEmbed()
					.setTitle("Edit Settings")
					.setDescription(
						`${guildData.level ? "Disabled" : "Enabled"} Level`
					)
					.setColor("#7289da")
				interaction.reply({
					ephemeral: true,
					embeds: [ö],
				})
			}
		} else {
			const s = new MessageEmbed()
				.setURL("https://youtu.be/pzeoCgrQo90")
				.setTitle("Server Settings")
				.setColor("#7289da")
				.setDescription(
					`Level ${
						guildData.level
							? "<:tick:875293075717644309>"
							: "<:xx:875293075591807007>"
					}\nMoyai Credit ${guildData.socialcredit
						? "<:tick:875293075717644309>"
						: "<:xx:875293075591807007>"
					}`
				)
			interaction.reply({
				embeds: [s],
			})
		}
	},
}
