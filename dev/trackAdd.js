module.exports = async (client, message, track, channel) => {
	const queue = await client.player.getQueue(message.guild)

	queue.metadata.send({
		embeds: [
			{
				title: "Play",
				description: `**[${track.title}](${track.url})** by **${track.author}** Queued`,
				color: "43b581",
				thumbnail: {
					url: `${track.thumbnail}`,
				},
			},
		],
	})
	setInterval(() => (queue.previousTracks = []), 2000)
}
