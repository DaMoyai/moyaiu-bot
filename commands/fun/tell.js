const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "tell",
	botPerms: ["SEND_MESSAGES"],
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("tell")
		.setDescription(
			"/say but with an embed and stuff!!!"
		)
		.addStringOption((option) =>
			option
				.setName("message")
				.setDescription("the message to include")
				.setRequired(true)
		),
	execute(client, interaction, userData, guildData) {
		interaction.channel.send({
			embeds: [
				{
					color: "RANDOM",
					author: {
						name: `${interaction.member.user.username}#${interaction.member.user.discriminator}`,
						icon_url: `${interaction.member.user.avatarURL({
							dynamic: true,
						})}`,
						url: `https://youtu.be/yrKZu3CXhHE`,
					},
					description: `${interaction.options
						.getString("message")
						.toLocaleString("en-US")}`,
				},
			],
		})
		interaction.reply({ content: ":moyai:", ephemeral: true })
	},
}
