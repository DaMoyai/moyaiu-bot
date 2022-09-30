const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const commandss = []

fs.readdirSync("./commands").forEach((dirs) => {
	const commands = fs
		.readdirSync(`./commands/${dirs}`)
		.filter((files) => files.endsWith(".js"))

	for (const file of commands){
		const command = require(`./commands/${dirs}/${file}`)
		console.debug(command.name)
		commandss.push(command.data.toJSON())
	}
})

const rest = new REST({ version: "9" }).setToken(
	"token"
)
rest.put(Routes.applicationCommands("bot id"), { body: commandss })
//* guild commands
//rest.put(Routes.applicationGuildCommands("bot id", "guild id"),{ body: commandss })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error)
