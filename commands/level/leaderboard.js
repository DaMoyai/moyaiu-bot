const Levels = require("discord-xp")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	name: "leaderboard",
	category: "Level",
	aliases: ["ranks", "levels", "rankboard", "lb"],
	usage: "Leaderboard",
	description: "Shows the leaderboard",
	data: new SlashCommandBuilder()
		.setName("leaderboard")
		.setDescription("top 10 users")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("level")
				.setDescription("Leaderboard for the level system")
		),
	async execute(client, interaction) {
		if (interaction.options.getSubcommand() === "level") {
			const rawLeaderboard = await Levels.fetchLeaderboard(
				interaction.guild.id,
				10
			)

			if (rawLeaderboard.length < 1)
				return interaction.reply({
					content: "Nobody's in the leaderboard",
					ephemeral: true,
				})

			const leaderboard = await Levels.computeLeaderboard(
				client,
				rawLeaderboard,
				true
			)

			const lb = leaderboard.map(
				(e) =>
					`${e.position}. **${e.username}#${
						e.discriminator
					}** Level: ${e.level} XP: ${e.xp.toLocaleString()}`
			)
			const embed = {
				url: "https://youtu.be/Q7Wq7xe0GW0",
				title: "Leaderboard",
				description: `${lb.join("\n")}`,
				color: "RANDOM",
			}
			interaction.reply({
				embeds: [embed],
			})
		}
		//* i had no idea what i was doing

		/*		if (interaction.options.getSubcommand() === "socialcred") {
			var Discord = require("discord.js")
			var collection = new Discord.Collection()
			await Promise.all(
				interaction.guild.members.cache.map(async (member) => {
					const id = member.id
					const data = await economy.findOne({
						userID: id,
					})
					console.log(`${member.user.tag} -> ${data.balance}`)
					return bal !== 0
						? collection.set(id, {
								id,
								balance,
						  })
						: null
				})
			)
			const data = collection
				.sort((a, b) => b.bal - a.data.balance)
				.first(10)
			console.debug(
				data.map((v, i) => {
					return `${i + 1}) ${
						client.users.cache.get(v.id).tag
					} => **${v.bal}**   coins`
				})
			)
			const embed = new Discord.MessageEmbed()
				.setColor("#7289da")
				.setTitle(`Leaderboard in ${interaction.guild.name}`)
				.setDescription(
					data
						.map((v, i) => {
							console.log(v)
							return `${i + 1}) ${
								client.users.cache.get(v.id).tag
							} - **${v.bal}**   coins`
						})
						.join("\n")
				)
			interaction.reply({ embeds: [embed] })
		}*/
	},
}
