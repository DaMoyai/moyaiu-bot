const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "resume",
	aliases: ["continune"],
	category: "Music",
	usage: "resume",
	description: "Resumes the queue",
	data: new SlashCommandBuilder()
		.setName("resume")
		.setDescription("Resumes the queue"),
	async execute(client, interaction) {
		const queue = await client.player.createQueue(interaction.guild, {
			metadata: interaction.channel,
		})

		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Resume",
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
						title: "Resume",
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
						title: "Resume",
						description: "Nothing is currently playing",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		/*if (!queue.paused)
			return interaction.reply({
				embeds: [{
					title: "Resume",
					description: "The song is already playing",
					color: "#f04747",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},]
			})
			*/

		if (!queue || !queue.playing)
			return void interaction.reply({
				content: "❌ | No music is being played!",
			})
		const success = queue.setPaused(false)
		return void interaction.reply({
			content: success ? "▶ | Resumed!" : "❌ | Something went wrong!",
		})
		interaction.reply({
			embeds: {
				title: "Resume",
				description: ` **${queue.current}** Resumed!`,
				color: "#43b581",
				timestamp: new Date(),
				footer: {
					text: `Paused by ${queue.requestedBy.username}`,
				},
			},
		})
	},
}
