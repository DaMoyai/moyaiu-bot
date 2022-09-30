const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "play",
	category: "Music",
	botPerms: ["CONNECT", "SPEAK"],
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a song from yt,soundcloud, Discord Attachment URL")
		.addStringOption((option) => option.setName("song").setDescription("A url or name").setRequired(true)),
	async execute(client, interaction, userData, guildData) {
		//* cool moyai credit check
		if (guildData.socialcredit) {
			if (userData.socialcredit < 1000) {
				return (reply = {
					ephemeral: true,
					content: "you dont have enough socialcredit",
				})
			}
		}
		// errors
		if (!interaction.member.voice.channel)
			return interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Play",
						description: "join a vc",
						color: `#f04747`,
						timestamp: new Date(),
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
						title: "Play",
						description: "im used in a different vc",
						color: `#f04747`,
						timestamp: new Date(),
					},
				],
			})
		// music
		const query = interaction.options.getString("song")
		const searchResult = await client.player
			.search(query, {
				requestedBy: interaction.member,
			})
			.catch(() => {})
		if (!searchResult || !searchResult.tracks.length)
			return void interaction.reply({ content: "No results were found!" })
		const playdl = require("play-dl")

		const queue = await client.player.createQueue(interaction.guild, {
			metadata: interaction.channel,
			enableLive: false,
			leaveOnEmpty: true,
			leaveOnEnd: true,
			autoSelfDeaf: true,
			leaveOnEmptyCooldown: 60,
			fetchBeforeQueued: true,
			spotifyBridge: true,
			volumeSmoothness: 0.1,
			//	bufferingTimeout: 5000,
			async onBeforeCreateStream(track, source, _queue) {
				if (track.url.includes("youtube.com") || track.url.includes("youtu.be")) {
					try {
						return (
							await playdl.stream(track.url, {
								discordPlayerCompatibility: true,
							})
						).stream
					} catch (err) {
						return _queue.metadata.reply("This video is restricted. Try with another link.")
					}
				} else if (track.url.includes("spotify.com")) {
					try {
						let songs = await client.player
							.search(`${track.author} ${track.title} `, {
								requestedBy: interaction.user,
							})
							.catch()
							.then((x) => x.tracks[0])
						return (
							await playdl.stream(songs.url, {
								discordPlayerCompatibility: true,
							})
						).stream
					} catch (err) {
						console.log(err)
					}
				} else if (track.url.includes("soundcloud")) {
					try {
						return (
							await playdl.stream(track.url, {
								discordPlayerCompatibility: true,
							})
						).stream
					} catch (err) {
						console.log(err)
					}
				}
			},
		})
		// another error lol
		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel)
		} catch {
			void client.player.deleteQueue(interaction.guildId)
			return (reply = {
				content: "Could not join your voice channel!",
			})
		}
		// add track(s)
		if (searchResult.playlist) {
			queue.addTracks(searchResult.tracks)

			reply = {
				embeds: [
					{
						description: `Queued **${searchResult.tracks.length}** tracks from [${searchResult.tracks[0].playlist.title}](${searchResult.tracks[0].playlist.url})`,
						color: 0x44b868,
					},
				],
				failIfNotExists: false,
			}
		} else {
			queue.addTrack(searchResult.tracks[0])

			reply = {
				embeds: [
					{
						title: "Play",
						description: `**[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})** by **${searchResult.tracks[0].author}** Queued`,
						color: "43b581",
						thumbnail: {
							url: `${searchResult.tracks[0].thumbnail}`,
						},
					},
				],
				failIfNotExists: false,
			}
		}

		if (!queue.createStream) {
		}
		interaction.reply(reply)
		//searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0])
		if (!queue.playing) await queue.play()
	},
}
