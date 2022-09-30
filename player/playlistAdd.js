module.exports = (client, message, queue, playlist) => {
	queue.metadata.send({
		embeds: {
			title: "Added Playlist",
			description: `Added **${playlist.title}** by **${playlist.author}** to the queue! `,
			color: "RANDOM",
			thumbnail: { url: playlist.thumbnail },
			timestamp: new Date(),
			footer: {
				text: `Added by ${message.member.user.tag}`,
			},
		},
	})
}
