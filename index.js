// imports
const Discord = require("discord.js")
const { Player } = require("discord-player")
//require("discord-player/smoothVolume")
require("dotenv").config()
//const { Reverbnation } = require("@discord-player/extractor")
const mongoose = require("mongoose")
const Level = require("discord-xp")
Level.setURL(process.env.DATABASE)
const { DiscordTogether } = require("discord-together")
const {
	MessageEmbed,
	MessageActionRow,
	MessageSelectMenu,
	Options,
	LimitedCollection,
} = require("discord.js")
const client = new Discord.Client({
	// set status to mobile, seems to be broken tho
	ws: {
		properties: {
			$browser: "Discord iOS",
		},
	},
	intents: [
		"GUILDS",
		"GUILD_MESSAGES",
		"GUILD_VOICE_STATES" /*, "GUILD_INVITES"*/,
		"GUILD_PRESENCES",
	],
	allowedMentions: {
		repliedUser: false,
	},
	FailIfNotExist: false,
	makeCache: Options.cacheWithLimits({
		MessageManager: 0,
		GuildBanManager: 0,
		ReactionManager: 0,
		ReactionUserManager: 0,
		StageInstanceManager: 0,
		ThreadManager: 0,
		ThreadMemberManager: 0,
		InviteManager: 0,
	}),
})
// discord activities
client.discordTogether = new DiscordTogether(client)

exports.client = client
client.login(process.env.TOKEN)
require("./config/moyaiuConfig")(client, Player, Discord) // config
require("./error")
require("./filters")
// Import cmd handler
console.log("----------------------------")
require("./handler/slashHandler")(client)
require("./handler/eventHandler")(client)
require("./handler/playerLoader")(client)
console.log("----------------------------")


//! Database
// yeah i used mongoose, cry harder
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.info("Connected to the database!")
	})
	.catch((err) => {
		console.error(err)
	})
