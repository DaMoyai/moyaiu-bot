const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "stop",
	aliases: ["fuckoff", "shutthefuckup", "shutup", "stfu"],
	category: "Music",
	usage: "stop",
	description: "Stops the playback",
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stops the queue"),
	execute(client, interaction) {
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Stop",
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
						title: "Stop",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		/*	if (!client.player.createQueue(interaction.guild).getQueue(interaction))
			return interaction.reply({
				embeds: {
					title: "Stop",
					description: "Nothing is playing",
					color: "#f04747",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			})
			*/

		const queue = client.player.getQueue(interaction.guildId)
		if (!queue || !queue.playing)
			return void interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Stop",
						description: "No music is being played",
						color: "f04747",
					},
				],
			})
		queue.destroy()
		return void interaction.reply({
			embeds: [
				{
					title: "Stop",
					description: "Stopped the player!",
					color: "43b581",
				},
			],
		})
	},
}
