const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
module.exports = {
	name: "randommoyai",
	cooldown: 10,
	category: "Fun",
	data: new SlashCommandBuilder()
		.setName("randommoyai")
		.setDescription("send a moyai image from a list"),
	async execute(client, interaction, userData, guildData) {
		if (guildData.socialcredit) {
			if (userData.socialcredit < 15000) {
				return interaction.reply({
					ephemeral: true,
					content: "you dont have enough socialcredit",
				})
			}
		}
		const collector = interaction.channel.createMessageComponentCollector({
			idle: 30000,
		})
		const anotherMoyai = new MessageButton()
			.setLabel("Another Moyai")
			.setStyle("SECONDARY")
			.setCustomId("another")
			.setEmoji("🗿")

		const btns1 = new MessageActionRow().addComponents([anotherMoyai])
		const pic = client.config.moyais
		const pics = Math.floor(Math.random() * pic.length)

		const embed = new MessageEmbed()
			.setURL(`https://youtu.be/vkpYIvL_B5I`)
			.setTitle(`Random Moyai`)
			.setImage(`${pic[pics]}`)
			.setColor("RANDOM")
		interaction.reply({
			embeds: [embed],
			components: [btns1],
		})

		collector.on("collect", async (i) => {
			const pic = client.config.moyais
			const pics = Math.floor(Math.random() * pic.length)
			const embed = new MessageEmbed()
				.setURL(`https://youtu.be/vkpYIvL_B5I`)
				.setTitle(`Random Moyai 🗿`)
				.setImage(`${pic[pics]}`)
				.setColor("RANDOM")
			i.update({
				embeds: [embed],
				components: [btns1],
			})
			/*} else {
				i.reply({
					ephemeral: true,
					content: "these arent ur buttons smh",
				})
			}*/
		})
	},
}
