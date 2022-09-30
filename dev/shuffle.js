const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "shuffle",
	aliases: ["sh"],
	category: "Music",
	usage: "shuffle",
	description: "Shuffles the queue",
	execute(client, interaction) {
		/*
		if (!interaction.member.voice.channel)
			return interaction.reply({
				embeds: [
					{
						title: "Shuffle",
						description: "Join a vc",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
			return interaction.reply({
				embeds: [
					{
						title: "Shuffle",
						description: "You're not in the same voice channel",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		// console.log()
		if (!queue)
			return interaction.reply({
				embeds: [
					{
						title: "Shuffle",
						description: "Nothing is playing",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		queue.shuffle()

		return interaction.reply({
			embeds: [
				{
					title: "Shuffle",
					description: "Shuffled the Queue!",
					color: "#43b581",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			],
		})
		*/ interaction.reply("This command is currently broken")
	},
}
