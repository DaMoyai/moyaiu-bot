const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "activity",
	botPerms: ["CREATE_INSTANT_INVITE"],
	cooldown: 30,
	data: new SlashCommandBuilder()
		.setName("activity")
		.setDescription("Starts an activity in your current voice channel")
		.addStringOption((option) =>
			option
				.setName("activity")
				.setDescription("The activity")
				.setRequired(true)
				.addChoices(
					{ name: "YouTube", value: "youtube" },
					{ name: "Fishington.io", value: "fishing" },
					{ name: "Betrayal.io", value: "betrayal" },
					{ name: "Poker", value: "poker" },
					{ name: "Chess", value: "chess" },
					{ name: "Letter Tile", value: "lettertile" },
					{ name: "Word Snack", value: "wordsnack" },
					{ name: "sketch heads", value: "sketchheads" },
					{ name: "putt party", value: "puttparty" },
					{ name: "ocho", value: "ocho" }
				)
		),
	async execute(client, interaction) {
		if (!interaction.member.voice.channel)
			return interaction.reply({
				content: "join a vc",
				ephemeral: true,
			})
		client.discordTogether
			.createTogetherCode(interaction.member.voice.channel.id, interaction.options.getString("activity"))
			.then(async (invite) => {
				const emb = {
					title: "Activity",
					description: `${invite.code}`,
					color: "#7289da",
				}

				interaction.reply({ embeds: [emb], ephemeral: true })
			})
	},
}
