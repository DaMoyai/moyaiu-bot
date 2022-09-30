const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "remove",
	aliases: ["delete"],
	category: "Music",
	usage: "remove <queue number>",
	description: "Removes a song from the queue",
	data: new SlashCommandBuilder()
		.setName("remove")
		.setDescription("Removes a song from the queue")
		.addIntegerOption((option) =>
			option
				.setName("song")
				.setDescription("The song to remove (queue number)")
				.setRequired(true)
		),
	execute(client, interaction) {
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Remove",
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
						title: "Remove",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		const queue = client.player.getQueue(interaction.guild)

		if (!queue)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Remove",
						description: "Nothing is playing",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (queue.tracks.length < 2)
			return interaction.reply({
				embeds: [
					{
						title: "Remove",
						description: "There's nothing to remove",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (isNaN(interaction.options.getInteger("song")))
			return interaction.reply(
				{
					ephemeral: true,
					embeds: [
						{
							title: "Remove",
							description: `Invalid number.\nPlease use a queue number between 1 to ${
								queue.tracks.length - 1
							}`,
							color: "#f04747",
							timestamp: new Date(),
							footer: {
								text: `${interaction.member.user.tag}`,
							},
						},
					],
				}`
					}`
			)

		if (Number(interaction.options.getInteger("song")) === 0)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Remove",
						description: "Can't remove a song im already playing",
						color: "FEE75C",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (
			Number(interaction.options.getInteger("song")) >=
				queue.tracks.length ||
			Number(interaction.options.getInteger("song")) < 1 ||
			!queue.tracks[interaction.options.getInteger("song")]
		)
			return interaction.reply({
				embeds: [
					{
						title: "Remove",
						description: "This is not in the queue",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		const song =
			queue.tracks[Number(interaction.options.getInteger("song"))]

		queue.remove(Number(interaction.options.getInteger("song") - 1))

		interaction.reply({
			embeds: [
				{
					title: "Remove",
					description: `Removed **${song.title}** from the Queue`,
					color: "#43b581",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			],
		})

		//	interaction.reply("Not finished!")
	},
}
