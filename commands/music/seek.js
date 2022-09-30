const parse = require("parse-duration")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "seek",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("seek")
		.setDescription("Jump to a specific time in the current song")
		.addStringOption((option) =>
			option.setName("time").setDescription("the time").setRequired(true)
		),
	async execute(client, interaction) {
		const queue = await client.player.getQueue(interaction.guild)

		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Seek",
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
						title: "Seek",
						description: "You're not in the same voice channel",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		const time = parse(`${interaction.options.getString("time")}`)
		if (!time || isNaN(time) || time === "Infinity")
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Volume",
						description: "Enter a correct timestamp",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		if (Number(time) < 0) {
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Seek",
						descrption: "Enter a correct timestamp",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		}
		const notvc = {
			title: "Seek",
			description: "join a vc",
			color: `#f04747`,
			timestamp: new Date(),
		}
		if (!interaction.member.voice.channel)
			return interaction.reply({
				embeds: [notvc],
				ephemeral: true,
			})
		if (time >= queue.current.durationMS)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Seek",
						description:
							"The indicated time is higher than the total time of the current song",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		queue.seek(time)
		interaction.reply({
			embeds: [
				{
					title: "Seek",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
					description: `Seeked to ${interaction.options.getString(
						"time"
					)}`,
					color: "687dc6",
				},
			],
		})
	},
}
