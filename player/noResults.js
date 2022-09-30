module.exports = (client, message, query) => {
	message.reply({
		embeds: {
			title: "Error!",
			description: `I found nothing on YouTube for **${query}**`,
			color: "#f04747",
		},
	})
}
