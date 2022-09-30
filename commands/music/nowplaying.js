const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "nowplaying",
	aliases: ["np", "songinfo"],
	category: "Music",
	usage: "nowplaying",
	description: "Shows info about the currently playing song",
	data: new SlashCommandBuilder()
		.setName("nowplaying")
		.setDescription("Shows info about the current song"),
	execute(client, interaction) {
		const queue = client.player.createQueue(interaction.guild)
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: {
					title: "Now Playing",
					description: "join a vc",
					color: "#f04747",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			})

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.reply({
				ephemeral: true,
				embeds: {
					title: "Now Playing",
					description: "im currently used in a different vc ",
					color: "#f04747",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			})

		if (!queue.connection)
			return interaction.reply({
				ephemeral: true,
				embeds: {
					title: "Now Playing",
					description: "Nothing is playing",
					color: "#f04747",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			})

		const track = queue.current
		const filters = []
		const timestamp = queue.getPlayerTimestamp()
		const trackDuration =
			timestamp.progress == "Infinity" ? "Live" : track.duration

		const np = {
			color: "#7289da",
			author: { name: "Now Playing", url: `${track.url}` },
			title: `${track.title}`,
			url: `${track.url}`,
			fields: [
				{
					name: "Channel",
					value: `${track.author}`,
					inline: true,
				},
				{
					name: "Requested by",
					value: `${track.requestedBy}`,
					inline: true,
				},
				{
					name: "Views",
					value: `${track.views.toLocaleString("en-US")}`,
					inline: true,
				},
				{
					name: "Duration",
					value: `${trackDuration}`,
					inline: true,
				},
				{
					name: "Volume",
					value: `${queue.volume}`,
					inline: true,
				},
				{
					name: "Loop",
					value: `${queue.repeatMode ? "Enabled" : "Disabled"}`,
					inline: true,
				},
			/*	{
					name: "Auto Play",
					value: `${queue.autoPlay ? "Enabled" : "Disabled"}`,
					inline: true,
				},*/
				{
					name: "Paused",
					value: `${queue.paused ? "Yes" : "No"}`,
					inline: true,
				},

				{
					name: "\u200b",
					value: `${queue.createProgressBar({
						timecodes: true,
						indicator: "<:dot:846046768234758156>",
						line: "▬",
						length: 15,
					})}`,
					inline: false,
				},
			],
			thumbnail: { url: `${track.thumbnail}` },
			timestamp: new Date(),
		}
		interaction.reply({
			embeds: [np],
		})
	},
}
