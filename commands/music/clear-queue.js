const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "clear-queue",
	aliases: ["cq", "clearqueue"],
	category: "Music",
	usage: "clear-queue",
	description: "Clears the queue",
	data: new SlashCommandBuilder()
		.setName("clearqueue")
		.setDescription("Clears the queue"),
	execute(client, interaction) {
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Queue Clear",
						description: "You are not in a voice channel",
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
						title: "Queue Clear",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (!queue)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Queue Clear",
						description: "Nothing is playing",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (
			client.player.createQueue(interaction.guild).getQueue(interaction)
				.tracks.length <= 1
		)
			return interaction.reply({
				ephemeral: true,

				embeds: [
					{
						title: "Queue Clear",
						description: "There's only 1 song in the Queue",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		queue.clear()

		interaction.reply({
			embeds: [
				{
					title: "Queue Clear",
					description: "Cleared the Queue",
					color: "#43b581",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			],
		})
	},
}
