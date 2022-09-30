//! broken

const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "back",
	aliases: ["b", "previous", "bak", "fuckgoback", "kraccbacc"],
	category: "Music",
	usage: "back",
	description: "Plays the previous song",
	data: new SlashCommandBuilder()
		.setName("back")
		.setDescription("Play the previous song"),
	execute(client, interaction) {
		const queue = client.player.createQueue(interaction.guild)

		const notvc = {
			title: "Back",
			description: "join a vc",
			color: `#f04747`,
			timestamp: new Date(),
		}
		if (!interaction.member.voice.channel)
			return interaction.reply({
				embeds: [notvc],
				ephemeral: true,
			})
		const notsame = {
			title: "Back",
			description: "im currently used in a different vc ",
			color: "#f04747",
			timestamp: new Date(),
		}
		const nothingplay = {
			title: "Back",
			description: "Nothing is playing",
			color: "#f04747",
			timestamp: new Date(),
		}
		const sucess = {
			title: "Back",
			description: "Playing previous song",
			color: "#43b581",
			timestamp: new Date(),
		}
		const nop = {
			title: "Back",
			description: "There wasn't a previous song",
			color: "#f04747",
			timestamp: new Date(),
		}
		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.reply({
				embeds: [notsame],
				ephemeral: true,
			})

		if (!queue)
			return interaction.reply({
				embeds: [nothingplay],
				ephemeral: true,
			})

		if (client.player.getQueue(interaction.guild).previousTracks.length < 1)
			return interaction.reply({
				embeds: [nop],
				ephemeral: true,
			})

		queue.back()

		interaction.reply({
			embeds: [sucess],
		})
	},
}
