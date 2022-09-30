const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "leave",
	category: "Music",
	data: new SlashCommandBuilder().setName("leave").setDescription("leaves the vc"),
	async execute(client, interaction) {
		const queue = client.player.getQueue(interaction.guildId)
		queue.destroy(true)
		interaction.reply({
			embeds: [
				{
					title: "Leave",
					description: "Left the vc!",
					color: "#7289da",
				},
			],
		})
	},
}
