const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "volume",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("volume")
		.setDescription("Changes the volume")
		.addIntegerOption((option) =>
			option
				.setName("volume")
				.setDescription("volume")
				.setRequired(true)
				.setMinValue(1)
				.setMaxValue(500)
		),
	async execute(client, interaction, userData, guildData) {
		if (guildData.socialcredit) {
			if (userData.socialcredit < 1000) {
				return interaction.reply({
					ephemeral: true,
					content: "you dont have enough socialcredit",
				})
			}
		}
		const queue = client.player.getQueue(interaction.guildId)

		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Volume",
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
						title: "Volume",
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
						title: "Volume",
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
			!interaction.options.getInteger("volume") ||
			isNaN(interaction.options.getInteger("volume")) ||
			interaction.options.getInteger("volume") === "Infinity"
		)
			return interaction.reply({
				embeds: [
					{
						title: "Volume",
						description: `Current volume is **${queue.volume}**%`,
						color: "687dc6",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		if (
			Math.round(parseInt(interaction.options.getInteger("volume"))) <
				1 ||
			Math.round(parseInt(interaction.options.getInteger("volume"))) > 500
		)
			return interaction.reply({
				embeds: [
					{
						title: "Volume",
						description: `Current volume is **${queue.volume}**%`,
						color: "687dc6",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		queue.setVolume(parseInt(interaction.options.getInteger("volume")))
		interaction.reply({
			embeds: [
				{
					title: "Volume",
					description: `Changed volume to **${parseInt(
						interaction.options.getInteger("volume")
					)}%**`,
					color: "#43b581",
					timestamp: new Date(),
					footer: {
						text: `${interaction.member.user.tag}`,
					},
				},
			],
		})

		/*const vol = args[0]
		if (!vol) return void interaction.reply({ content: `🎧 | Current volume is **${queue.volume}**%!` })
		if (vol.value < 0 || vol.value > 500)
			return void interaction.reply({ content: "❌ | Volume range must be 0-500" })
		const success = void interaction.reply({
			content: success ? `✅ | Volume set to **${vol.value}%**!` : "❌ | Something went wrong!",
		})
		*/
	},
}
