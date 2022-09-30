const fs = require("fs")
const events = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))

module.exports = function (client) {
	for (const file of events) {
		const event = require(`../events/${file}`)
		console.log(`| ${file} | ✅`)
		client.on(file.split(".")[0], event.bind(null, client))
		delete require.cache[require.resolve(`../events/${file}`)]
	}
}
