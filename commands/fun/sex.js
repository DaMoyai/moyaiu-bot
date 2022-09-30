const { SlashCommandBuilder } = require("@discordjs/builders")
const wait = require("util").promisify(setTimeout)

module.exports = {
	name: "sex",
	category: "Fun",
	cooldown: 7,
	data: new SlashCommandBuilder()
		.setName("sex")
		.setDescription("fun for the whole family!")
		.addStringOption((option) =>
			option
				.setName("target")
				.setDescription("the guy to have sex with")
				.setRequired(true)
		),
	async execute(client, interaction) {
		if (!interaction.channel.nsfw) {
			return interaction.reply(
				"This command can only be used in nsfw channels"
			)
		}
		await interaction.reply(`preparing the sex...`)

		await wait(1000)
		await interaction.editReply("sex starts")
		await wait(1000)
		await interaction.editReply("*moan*")
		await wait(500)
		await interaction.editReply("harder daddy!")
		await wait(1000)
		await interaction.editReply("YES DADDY FASTER AWW YESSSS")
		await wait(2000)
		await interaction.editReply("OH YES WE COMING!")

		await wait(1000)

		await interaction.editReply("*cumming*")
		await wait(1000)
		await interaction.editReply(
			`u just sexxed with ${interaction.options.getString("target")}`
		)
	},
}
