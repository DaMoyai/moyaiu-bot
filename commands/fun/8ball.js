const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "8ball",
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("very cool 8ball")
		.addStringOption((option) =>
			option
				.setName("question")
				.setDescription("the question!!!")
				.setRequired(true)
		),
	async execute(client, interaction) {
		var random = [
			"yes",
			"no",
			"u decide",
			"im too lazy to answer rn",
			"idc",
			"idk dude",
			"HOG RIDER",
			"sure whatever",
			"lol no",
			"nah",
			"bruh idc",
			"no!!!!!!",
			"no :heart:",
			"hell yeah",
			"wait how do i walk?",
			"what 💀",
			"bruh!!!! 🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿🗿",
			"hell yeah!",
			"🗿",
		]
		var random2 = Math.floor(Math.random() * pp.length)

		const embeds2 = {
			url: "https://youtu.be/H8PyKKkDIzI",
			title: "8Ball",
			timestamp: new Date(),
			color: "RANDOM",
			description: `\`${interaction.options.getString(
				"question"
			)}\` \n \n **${random[random2]}**`,
		}
		await interaction.reply({
			embeds: [embeds2],
		})
	},
}
