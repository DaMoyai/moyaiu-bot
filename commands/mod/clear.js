const { Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "clear",
	category: "Mod",
	perms: ["MANAGE_MESSAGES"],
	botPerms: ["MANAGE_MESSAGES"],
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("delete up to 100 messages")
		.addIntegerOption((option) =>
			option
				.setName("amount")
				.setDescription("Amount to clear")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(100)
		),
	execute(client, interaction) {
		const num = {
			title: "Clear",
			descrption: "Enter a correct number",
			color: "#f04747",
			timestamp: new Date(),
		}

		if (Number(interaction.options.getInteger("amount")) < 0) {
			return interaction.reply({
				embeds: [num],
				ephemeral: true,
			})
		}
		if (interaction.options.getInteger("amount") > "100")
			return interaction.channel.bulkDelete(100, true)

		const amount =
			Number(interaction.options.getInteger("amount")) > 100
				? 101
				: Number(interaction.options.getInteger("amount"))

		interaction.channel.bulkDelete(amount, true).then(
			interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Clear",
						description: `Deleted ${amount} Messages`,
						color: "#7289da",
					},
				],
			})
		)
	},
}
