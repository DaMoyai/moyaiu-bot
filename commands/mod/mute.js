const { SlashCommandBuilder } = require("@discordjs/builders")
const parse = require("parse-duration")

module.exports = {
	name: "mute",
	category: "Mod",
	perms: ["MODERATE_MEMBERS"],
	botPerms: ["MODERATE_MEMBERS"],
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Timeout/Mute someone with a custom duration!")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("The target user")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("duration")
				.setDescription("The duration of the mute")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("The reason for the mute")
				.setRequired(false)
		),

	async execute(client, interaction) {
		const target = interaction.options.getUser("target")
		const duration = parse(
			`${interaction.options.getString("duration")}`,
			"ms"
		)
		console.log(duration)
		const reason = interaction.options.getString("reason")
		if (Number(duration) < 0) {
			return interaction.reply({
				embeds: [
					{
						title: "Mute",
						description: "Enter a correct duration",
						color: "#f04747",
						timestamp: new Date(),
					},
				],
				ephemeral: true,
			})
		}
		if (duration > 2419200000) {
			interaction.guild.members.cache
				.get(target.id)
				.timeout(
					interaction.guild.members.cache
						.get(target.id)
						.timeout(2419200000, reason)
						.then(console.log)
						.catch(console.error),
				)
			interaction
				.reply({
					embeds: [
						{
							title: "Mute",
							description: `Muted ${target} for 1 month`,
						},
					],
				})
				.catch(console.error)
		}

		console.log(target.member)
		console.log(Date.now().toFixed() - duration / 1000)
		console.log(Date.now())
		interaction.guild.members.cache
			.get(target.id)
			.timeout(duration, reason)
			.catch(console.error)
		interaction.reply({
			embeds: [
				{
					title: "Mute",
					description: `Muted ${target} for **${interaction.options.getString(
						"duration"
					)}**`,
				},
			],
		})
	},
}
