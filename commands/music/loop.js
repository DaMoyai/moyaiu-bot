const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "loop",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("loop")
		.setDescription("Loops a song or queue")
		.addStringOption((option) =>
			option
				.setName("mode")
				.setDescription("The loop mode")
				.setRequired(true)
				.addChoices({name:"Song", value:"song"}, {name:"Queue", value:"queue"}, {name:"Disable", value:"disable"})

		),

	execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guildId)

		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Loop",
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
						title: "Loop",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),

						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (!queue.playing)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Loop",
						description: "Nothing is playing",
						color: "#f04747",
						timestamp: new Date(),

						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (interaction.options.getString("mode").toLowerCase() === "queue") {
			queue.setRepeatMode(2)
			return interaction.reply({
				embeds: [
					{
						title: "Loop",
						description: "Looped Queue",
						color: "#43b581",
						timestamp: new Date(),

						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		} else if (interaction.options.getString("mode") === "song") {
			queue.setRepeatMode(1)
			return interaction.reply({
				embeds: [
					{
						title: "Loop",
						description: "Looped Song",
						color: "#43b581",
						timestamp: new Date(),

						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		} else if (interaction.options.getString("mode") === "disable") {
			if (queue.repeatMode) {
				queue.setRepeatMode(0)
				return interaction.reply({
					embeds: [
						{
							title: "Loop",
							description: "Loop disabled",
							color: "#43b581",
							timestamp: new Date(),

							footer: {
								text: `${interaction.member.user.tag}`,
							},
						},
					],
				})
			}
		}
		/*	if (!queue || !queue.playing) return void interaction.followUp({ content: "❌ | No music is being played!" })
		const loopMode = interaction.options.get("mode").value
		const success = queue.setRepeatMode(loopMode)
		const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶"
		return void interaction.followUp({
			content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!",
		})
		*/
	},
}
