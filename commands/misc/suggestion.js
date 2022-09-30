//! sends a message to the suggestiona channel

const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "suggestion",
	cooldown: 300,
	category: "Misc",
	data: new SlashCommandBuilder()
		.setName("suggestion")
		.setDescription("suggest something")
		.addStringOption((option) =>
			option.setName("suggestion").setDescription("The suggestion to send").setRequired(true)
		),
	execute(client, interaction) {
		const succ = {
			author: {
				name: `${interaction.member.user.username}`,
				icon_url: `${interaction.member.user.avatarURL({ dynamic: true })}`,
			},
			title: "Suggestion",
			description: `${interaction.options.getString("suggestion")}`,
			color: "RANDOM",
		}

		client.channels.cache
			.get("channel id")
			.send({
				embeds: [succ],
			})
			.then(async (interaction) => {
				await interaction.react("✅"), interaction.react("❌")
			})
		interaction.reply({
			ephemeral: true,
			embeds: [
				{
					title: "Suggestion",
					description: `suggestion sent to bot server`,
					color: "RANDOM",
				},
			],
		})
	},
}
