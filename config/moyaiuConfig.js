module.exports = function (client, Player, Discord, message) {
	client.player = new Player(client)
	client.config = require("../config/config")
	client.commands = new Discord.Collection()
	client.filters = client.config.filters
	
}
