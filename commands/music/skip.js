const { MessageEmbed } = require("discord.js")

const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "skip",
	aliases: ["sk", "s"],
	category: "Music",
	usage: "skip",
	description: "Skips to the next song",
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skip to the next song"),
	execute(client, interaction, userData, guildData) {
		if (guildData.socialcredit) {
			if (userData.socialcredit < 1000) {
				return interaction.reply({
					ephemeral: true,
					content: "you dont have enough socialcredit",
				})
			}
		}
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Skip",
						description: "join a vc",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Skip",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Skip",
						description: "Nothing is playing",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		const currentTrack = queue.current.title
		const success = queue.skip()
		const embed = new MessageEmbed()
			.setColor("43b581")
			.setDescription(
				success
					? `Skipped **[${currentTrack}](${queue.current.url})**!`
					: "Something went wrong!"
			)
			.setTitle("Skip")

		interaction.reply({ embeds: [embed] })
	},
}
