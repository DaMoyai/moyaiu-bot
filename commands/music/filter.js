const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "filter",
	category: "Music",
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setName("filter")
		.setDescription("Toggle Music Filters")

		.addStringOption((option) =>
			option
				.setName("filter")
				.setDescription("The Filter to toggle")
				.setRequired(true)
				// .addChoice("8D", "8d")
				.addChoices(
					{ name: "Vibrato", value: "vibrato" },
					{ name: "Pulsator", value: "pulsator" },
					{ name: "Bass Boost", value: "bassboost" },
					{ name: "Vaporwave", value: "vaporwave" },
					{ name: "Nightcore", value: "nightcore" },
					{ name: "Daycore", value: "daycore" },
					{ name: "Ultra Bass Boost", value: "ultrabass" },
					{ name: "Party", value: "party" }
				)
				/*	.addChoice("Compressor", "compressor")
				.addChoice("Normalizer", "normalizer")
				.addChoice("Normalizer 2 (testing)", "normalizer2")*/
				//.addChoice("Echo", "echo")
				//.addChoice("Earrape", "earrape")
				/*.addChoice("Gate", "gate")
				.addChoice("Haas", "haas")
				.addChoice("Phaser", "phaser")
				.addChoice("Treble", "treble")*/
		),
	async execute(client, interaction, userData, guildData) {
		if (guildData.socialcredit) {
			if (userData.socialcredit < 900000) {
				return interaction.reply({
					ephemeral: true,
					content: "900.000 moyai credits are required to use this cmd",
				})
			}
		}
		const queue = client.player.getQueue(interaction.guildId)
		//	const actualFilter = queue.getFiltersEnabled()[0]

		const filters = []

		queue.getFiltersEnabled().map((x) => filters.push(x))
		queue.getFiltersDisabled().map((x) => filters.push(x))

		const filter = filters.find((x) => x.toLowerCase() === interaction.options.getString("filter").toLowerCase())

		const filtersUpdated = {}

		filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true

		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Filter",
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
			interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id
		)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Filter",
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
						title: "Filter",
						description: "Nothing is playing",
						color: "#f04747",
						timestamp: new Date(),

						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})

		/*	if (!args[0])
			return interaction.reply({
				embeds: [
					{
						title: "Filter",
						description: "You can see a list of filters with `/filters`",
						color: "#f04747",
						timestamp: new Date(),

						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
			*/
		const progress = queue.createProgressBar()
		const timestamp = queue.getPlayerTimestamp()
		if (timestamp.progress == "Infinity")
			interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Filter",
						description: "You cant apply filters in a live video",
					},
				],
			})

		/*	if (!filter)
			return interaction.reply({
				embeds: [
					{
						title: "Filter",
						description: "This filter doesn't exist",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
			*/

		queue.setFilters(filtersUpdated)
		interaction.reply({
			embeds: [
				{
					title: "Filter",
					description: `${
						queue.getFiltersEnabled().includes(filter) ? "Enabled" : "Disabled"
					} filter **${filter}**. This might take a while`,
					color: "#43b581",
					timestamp: new Date(),
					footer: {
						text: `or wont work at all🗿`,
					},
				},
			],
		})
	},
}
