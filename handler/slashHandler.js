const fs = require("fs")
module.exports = function (client) {
	fs.readdirSync("./commands").forEach((dirs) => {
		const commands = fs.readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith(".js"))

		for (const file of commands) {
			const command = require(`../commands/${dirs}/${file}`)
			console.info(`| ${file} | ✅`)
			client.commands.set(command.data.name, command)
			delete require.cache[require.resolve(`../commands/${dirs}/${file}`)]
		}
	})
}
