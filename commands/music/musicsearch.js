const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const playdl = require("play-dl")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "musicsearch",
	category: "Music",
	cooldown: 30,
	data: new SlashCommandBuilder()
		.setName("musicsearch")
		.setDescription("search a song on youtube")
		.addStringOption((option) => option.setName("search").setDescription("The search query").setRequired(true)),
	async execute(client, interaction, userData, guildData) {
		if (guildData.socialcredit) {
			if (userData.socialcredit < 100) {
				return interaction.reply({
					ephemeral: true,
					content: "you dont have enough socialcredit",
				})
			}
		}
		const notvc = {
			title: "Search",
			description: "join a vc",
			color: `#f04747`,
			timestamp: new Date(),
		}
		const notsame = {
			title: "Search",
			description: "im currently used in a different vc ",
			color: `#f04747`,
			timestamp: new Date(),
		}
		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id
		)
			return interaction.reply({
				embeds: [notsame],
				ephemeral: true,
			})
		if (!interaction.member.voice.channel)
			return interaction.reply({
				embeds: [notvc],
				ephemeral: true,
			})

		const search = await client.player.search(interaction.options.getString("search"), {
			requestedBy: interaction.member,
		})

		if (!search || !search.tracks.length)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Search",
						description: "No results found",
						color: "f04747",
					},
				],
			})

		const queue = await client.player.createQueue(interaction.guild, {
			metadata: interaction.channel,
			enableLive: false,
			leaveOnEmpty: true,
			leaveOnEnd: true,
			autoSelfDeaf: true,
			leaveOnEmptyCooldown: 300000,
			leaveOnEndCooldown: 300000,
			fetchBeforeQueued: true,
			volumeSmoothness: 0.1,
			async onBeforeCreateStream(track, source, _queue) {
				if (source === "youtube") {
					return (
						await playdl.stream(track.url, {
							discordPlayerCompatibility: true,
						})
					).stream
				}
			},
		})
		var select = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId("search")
				.setPlaceholder("Select a song")
				.addOptions([
					{
						label: `${search.tracks[0].title}`,
						description: `${search.tracks[0].author}`,
						value: `${search.tracks[0].url}`,
						emoji: "1️⃣",
					},
					{
						label: `${search.tracks[1].title}`,
						description: `${search.tracks[1].author}`,
						value: `${search.tracks[1].url}`,
						emoji: "2️⃣",
					},
					{
						label: `${search.tracks[2].title}`,
						description: `${search.tracks[2].author}`,
						value: `${search.tracks[2].url}`,
						emoji: "3️⃣",
					},
					{
						label: `${search.tracks[3].title}`,
						description: `${search.tracks[3].author}`,
						value: `${search.tracks[3].url}`,
						emoji: "4️⃣",
					},
					{
						label: `${search.tracks[4].title}`,
						description: `${search.tracks[4].author}`,
						value: `${search.tracks[4].url}`,
						emoji: "5️⃣",
					},
					{
						label: `${search.tracks[5].title}`,
						description: `${search.tracks[5].author}`,
						value: `${search.tracks[5].url}`,
						emoji: "6️⃣",
					},
					{
						label: `${search.tracks[6].title}`,
						description: `${search.tracks[6].author}`,
						value: `${search.tracks[6].url}`,
						emoji: "7️⃣",
					},
					{
						label: `${search.tracks[7].title}`,
						description: `${search.tracks[7].author}`,
						value: `${search.tracks[7].url}`,
						emoji: "8️⃣",
					},
					{
						label: `${search.tracks[8].title}`,
						description: `${search.tracks[8].author}`,
						value: `${search.tracks[8].url}`,
						emoji: "9️⃣",
					},
					{
						label: `${search.tracks[9].title}`,
						description: `${search.tracks[9].author}`,
						value: `${search.tracks[9].url}`,
						emoji: "🔟",
					},
				])
		)
		var disabledSelect = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId("jhdjkshfjfhfsfhsfjffhjhfjfjhfjhu8oshuhshugz")
				.setDisabled(true)
				.setPlaceholder(`Select Song`)
				.addOptions([
					{
						label: `🗿`,
						description: `🗿`,
						value: `🗿`,
					},
				])
		)
		const collector = interaction.channel.createMessageComponentCollector({
			max: 1,
			time: 10000,
		})
		collector.on("collect", async (i) => {
			if (i.user.id === interaction.user.id) {
				i.update({ components: [disabledSelect] })
				try {
					if (!queue.connection) await queue.connect(interaction.member.voice.channel)
				} catch {
					void client.player.deleteQueue(interaction.guildId)
					return void interaction.reply({
						content: "Could not join your voice channel!",
					})
				}

				if (!queue.createStream) {
				}
				const searchResult = await client.player.search(i.values.join(" "), {
					requestedBy: interaction.member,
				})

				queue.addTrack(searchResult.tracks[0])
				if (!queue.playing) await queue.play()
			} else {
				i.reply({
					content: `These buttons aren't for you!`,
					ephemeral: true,
				})
			}
		})

		collector.on("end", (reason) => {
			interaction.editReply({ components: [disabledSelect] })
		})
		const embed = new MessageEmbed()

		embed.setColor("687dc6")
		embed.setTitle(`Search`)

		const maxTracks = search.tracks.slice(0, 10)

		embed.setDescription(
			`${maxTracks
				.map((track, i) => `**${i + 1}** - **[${track.title}](${track.url})** | ${track.author}`)
				.join("\n")}\n\n`
		)

		embed.setTimestamp()
		embed.setFooter({
			text: `Select a song between 1 and ${maxTracks.length}`,
		})
		const filter = (i) => {
			i.deferUpdate()
			return i.user.id === interaction.user.id
		}
		interaction.reply({ embeds: [embed], components: [select] })

		/*		collector = message.createMessageComponentCollector({ componentType: "SELECT_MENU", time: 15000 })
		collector.on("collect", async (i) => {
		if (i.content.toLowerCase() === "cancel")
				return (
					message.reply({
						embeds: [
							{
								title: "Search",
								description: "Search has been cancelled!",
							},
						],
					}) && collector.stop()
				)
				

			const value = parseInt(i.value)
			console.log(value)

			if (!value || value <= 0 || value > maxTracks.length)
				return message.reply({
					embeds: [
						{
							title: "Search",
							description: `Enter a correct value between **1** and **${maxTracks.length}**, or cancel`,
						},
					],
				})

			collector.stop()
			

		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel)
		} catch {
			void client.player.deleteQueue(interaction.guildId)
			return void interaction.reply({ content: "Could not join your voice channel!" })
		}

		// await interaction.reply({ content: `⏱ | Loading your track...` })

		queue.addTrack(search.tracks[query.content - 1])

		if (!queue.playing) await queue.play()
		*/
	},
}
