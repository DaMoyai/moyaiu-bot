module.exports = async (client) => {
	console.info(process.env.READY)

	setInterval(
		() =>
			client.user.setActivity(
				`moyai the game | ${client.guilds.cache.size} servers`,
				{ type: "PLAYING" }
			),
		12000
	)
}
