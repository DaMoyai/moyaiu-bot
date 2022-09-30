const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "info",
	category: "Misc",
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription("Shows information about this bot"),
	execute(client, interaction) {
		var uptime = new Date(interaction.client.uptime)
		const days = Math.floor(
			interaction.client.uptime / (60 * 1000 * 60 * 24)
		)

		interaction.reply({
			ephemeral: true,
			embeds: [
				{
					title: "Infos",
					color: "RANDOM",
					url: "https://youtu.be/yrKZu3CXhHE",
					fields: [
						{
							name: "Ping",
							value: `${client.ws.ping} MS`,
							inline: true,
						},
						{
							name: "Uptime",
							value: `${days}d, ${uptime.getHours()}h, ${uptime.getMinutes()}m ${uptime.getSeconds()} s`,
							inline: true,
						},
						{
							name: "Server Count",
							value: `${client.guilds.cache.size}`,
							inline: true,
						},
						{
							name: "Voice Connections",
							value: `${client.voice.adapters.size}`,
							inline: true,
						},
					],
				},
			],
		})
	},
}
