const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageActionRow, MessageButton } = require("discord.js")
module.exports = {
	name: "help",
	category: "Misc",
	data: new SlashCommandBuilder().setName("help").setDescription("🗿"),
	execute(client, interaction) {
		const collector = interaction.channel.createMessageComponentCollector({
			idle: 10000,
		})
		const funBtn = new MessageButton()
			.setLabel("Fun")
			.setStyle("SECONDARY")
			.setCustomId("Fun")
			.setEmoji("🗿")
		const musicBtn = new MessageButton()
			.setLabel("Music (experimental)")
			.setStyle("SECONDARY")
			.setCustomId("Music")
			.setEmoji("🎵")
			
		const lvlBtn = new MessageButton()
			.setLabel("Level")
			.setStyle("SECONDARY")
			.setCustomId("Level")
			.setEmoji("🟢")
		const modBtn = new MessageButton()
			.setLabel("Moderation")
			.setStyle("SECONDARY")
			.setCustomId("Mod")
			.setEmoji("🛡")
		const miscBtn = new MessageButton()
			.setLabel("Misc")
			.setStyle("SECONDARY")
			.setCustomId("Misc")
			.setEmoji("❓")

		const btns1 = new MessageActionRow().addComponents([
			funBtn,
			lvlBtn,
			modBtn,
			miscBtn, musicBtn
		])
		collector.on("collect", async (i) => {
			if (i.user.id === interaction.user.id) {
				i.update({
					embeds: [
						{
							color: "RANDOM",
							url: "https://youtu.be/J5YR0uqPAI8",
							title: "Help",
							fields: [
								{
									name: i.customId,
									value: interaction.client.commands
										.filter((x) => x.category == i.customId)
										.map((x) => "`" + x.name + "`")
										.join(", "),
								},
							],
							timestamp: new Date(),
							footer: {
								text: `${interaction.member.user.tag}`,
							},
						},
					],
				})
			} else {
			}
		})

		interaction.reply({
			components: [btns1],
			embeds: [
				{
					title: "Choose a Category",
					color: "RANDOM",
				},
			],
		})
	},
}
