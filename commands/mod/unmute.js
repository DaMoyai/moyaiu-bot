const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	name: "unmute",
	category: "Mod",
	perms: ["MODERATE_MEMBERS"],
	botPerms: ["MODERATE_MEMBERS"],
	data: new SlashCommandBuilder()
		.setName("unmute")
		.setDescription("unmute someone")
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("The target user")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("The reason for the unmute")
				.setRequired(false)
		),

	async execute(client, interaction) {
		const target = interaction.options.getUser("target")
		const duration = 0
		const reason = interaction.options.getString("reason")

		

		interaction.guild.members.cache
			.get(target.id)
			.timeout(duration, reason)
			.catch(console.error)
		interaction.reply({
			embeds: [
				{
					title: "Unmute",
					description: `Unmuted ${target}`,
				},
			],
		})
	},
}
