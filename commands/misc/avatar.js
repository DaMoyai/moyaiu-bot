const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "avatar",
	category: "Misc",
	data: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("grab an avatar")
		.addUserOption((option) => option.setName("target").setDescription("The target user").setRequired(false)),
	execute(client, interaction) {
		const embeds1 = {
			title: "Avatar",
			color: "RANDOM",
			description: `${interaction.member}`,
			image: {
				url: `${interaction.member.displayAvatarURL({ format: "png", size: 4096, dynamic: true })}`,
			},
			timestamp: new Date(),
		}

		if (!interaction.options.getUser("target")) {
			return interaction.reply({
				embeds: [embeds1],
			})
		} else {
			const embeds2 = {
				url: "https://youtu.be/J5YR0uqPAI8",
				title: "Avatar",
				color: "RANDOM",
				description: `${interaction.options.getUser("target")}`,
				image: {
					url: `${interaction.options
						.getUser("target")
						.displayAvatarURL({
							format: "png",
							size: 4096,
							dynamic: true,
						})}`,
				},
				timestamp: new Date(),

				footer: {
					text: `${interaction.member.user.tag}`,
				},
			}

			interaction.reply({
				embeds: [embeds2],
			})
		}
	},
}
