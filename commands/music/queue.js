const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const paginationEmbed = require("discordjs-button-pagination")
const { MessageEmbed, MessageButton } = require("discord.js")

module.exports = {
	name: "queue",
	category: "Music",
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("shows the queue"),
	execute(client, interaction, _fromButton = false) {
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Queue",
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
				embeds: [
					{
						title: "Queue",
						description: "im currently used in a different vc ",
						color: "#f04747",
						timestamp: new Date(),
						footer: {
							text: `${interaction.member.user.tag}`,
						},
					},
				],
			})
		const queue = client.player.getQueue(interaction.guild)

		/*	if (!queue)
			return interaction.reply({
				embeds: [noq],
				ephemeral: true,
			})
		const songs = queue.tracks.length
		const nextSongs = songs > 6 ? `And **${songs - 5}** more` : ``
		const tracks = queue.tracks.map((track, i) => {
			const queue = client.player.getQueue(interaction.guild)

			return `**${i + 1}** - [${track.title}](${track.url}) | ${track.author} (${track.requestedBy})`
		})
		const embeds = new Discord.MessageEmbed()
			.setTitle(`Queue ${queue.loopMode ? "(Looped)" : ""}`)
			.setDescription(
				`	
				${tracks.slice(0, 6).join("\n")}\n\n${nextSongs}`
			)
			.addFields({
				name: "Length",
				value: `${queue.createProgressBar({
					timecodes: true,
					queue: true,
					indicator: "<:dot:846046768234758156>",
				})}`,
				name: "Now Playing",
				value: `[${queue.current.title}](${queue.current.url}) | [${queue.current.author}](${queue.current.author.url}) (${queue.current.requestedBy})`,
			})
			.setColor("687dc6")
			.setTimestamp()
			.setFooter(interaction.member.user.tag)

		interaction.reply({ embeds: [embeds] }) */

		let usedby
		if (_fromButton) usedby = interaction.user
		else usedby = ""

		const buttons = [
			new MessageButton()
				.setCustomId("previousbtn")
				.setLabel("Previous")
				.setStyle("SUCCESS"),
			new MessageButton()
				.setCustomId("nextbtn")
				.setLabel("Next")
				.setStyle("SUCCESS"),
		]
		const pages = []
		let page = 1
		let emptypage = false
		do {
			const pageStart = 10 * (page - 1)
			const pageEnd = pageStart + 10
			const tracks = queue.tracks
				.slice(pageStart, pageEnd)
				.map((m, i) => {
					return `**${i + pageStart + 1}**. [${m.title}](${m.url}) ${
						m.duration
					} - ${m.requestedBy}`
				})
			if (tracks.length) {
				const embed = new MessageEmbed().addFields({
					name: "Length",
					value: `${queue.createProgressBar({
						timecodes: true,
						queue: true,
						indicator: "<:dot:846046768234758156>",
					})}`,
					name: "Now Playing",
					value: `[${queue.current.title}](${queue.current.url}) | [${queue.current.author}](${queue.current.author.url}) (${queue.current.requestedBy})`,
				})
				embed.setDescription(
					`${usedby}\n${tracks.join("\n")}${
						queue.tracks.length > pageEnd
							? `\n... ${
									queue.tracks.length - pageEnd
							  } more track(s)`
							: ""
					}`
				)
				embed.setColor("#7289da")
				if (page === 1) embed.setTitle(`Queue`)
				pages.push(embed)
				page++
			} else {
				emptypage = 1
				if (page === 1) {
					const embed = new Discord.MessageEmbed()
						.setTitle(`Queue ${queue.loopMode ? "(Looped)" : ""}`)

						.addFields({
							name: "Now Playing",
							value: `[${queue.current.title}](${queue.current.url}) | [${queue.current.author}](${queue.current.author.url}) (${queue.current.requestedBy})`,
							name: "Length",
							value: `${queue.createProgressBar({
								timecodes: true,
								queue: true,
								indicator: "<:dot:846046768234758156>",
							})}`,
						})
						.setColor("687dc6")
						.setTimestamp()
						.setFooter(interaction.member.user.tag)
					return interaction.reply({
						embeds: [embed],
						ephemeral: true,
					})
				}
				if (page === 2) {
					return interaction.reply({ embeds: [pages[0]] })
				}
			}
		} while (!emptypage)
		return paginationEmbed(interaction, pages, buttons, 30000)
	},
}
