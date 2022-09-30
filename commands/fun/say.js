const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "say",
	category: "Fun",
	cooldown: 10,
	botPerms: ["SEND_MESSAGES"],
	data: new SlashCommandBuilder()
		.setName("say")
		.setDescription("cum")
		.addStringOption((option) =>
			option.setName("message").setDescription("the message to send").setRequired(true)
		),
	execute(client, interaction) {

		console.info(`say | ${interaction.member.user.id}: ${interaction.options.getString("message")}\nserv: ${interaction.guild.id}`)
		if (!interaction.options.getString("message"))
			return interaction.reply({
				embeds: [u],
			})
		interaction.channel.send(interaction.options.getString("message"))
		interaction.reply({ content: ":moyai: btw your message is logged", ephemeral: true })
	},
}
