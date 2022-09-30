const Level = require("discord-xp")
const fetch = require("node-fetch")
const economy = require("../models/user.js")
const settings = require("../models/settings.js")

module.exports = async (client, message) => {
	const botId = client.user.id // get the client (bot) id
	const uId = message.author.id // get the author id

	const url = `https://top.gg/api/bots/${botId}/check?userId=${uId}` // api endpoint

	//! Database
	//* User Settings

	//* Guild Settings
	let guildData = await settings.findOne({
		guildID: message.guild.id,
	})
	if (!guildData) {
		const serverData = await settings.create({
			guildID: message.guild.id,
		})
		await serverData.save().catch((e) => {
			console.log(e)
		})
		guildData = await settings.findOne({ guildID: message.guild.id })
	}

	//! Level System

	if (guildData.level) {
		if (message.author.bot || message.channel.type === "dm") return
		const botId = client.user.id // get the client (bot) id
		const uId = message.author.id // get the author id

		const url = `https://top.gg/api/bots/${botId}/check?userId=${uId}` // api endpoint
		var randomAmountOfXp = Math.floor(Math.random() * 30) + 10

		fetch(url, {
			method: "GET",
			headers: {
				Authorization:
					"topgg token",
			},
		})
			.then((res) => res.text())
			.then((json) => {
				var isVoted = JSON.parse(json).voted
				if (isVoted === 1) {
					randomAmountOfXp = Math.floor(Math.random() * 60) + 10
				}
			})

		const hasLeveledUp = await Level.appendXp(message.author.id, message.guild.id, randomAmountOfXp)
		const user = await Level.fetch(message.author.id, message.guild.id)
		if (user.level < 6) {
			randomAmountOfXp = Math.floor(Math.random() * 5) + 1
		}
		console.log(randomAmountOfXp)
		if (hasLeveledUp) {
			message.reply(`ur now level **${user.level}** `).then((m) => setTimeout(() => m.delete(), 5000))
		}
	} else {
	}
	if (guildData.socialcredit) {
		const content = message.content.toLowerCase()
		// words that remove moyai creddit
		const bad =
			content.includes("i hate moyai") ||
			content.includes("im gay") ||
			content.includes("john xina") ||
			content.includes("john cena") ||
			content.includes("i hate the ccp") ||
			content.includes("ccp bad") ||
			content.includes("communism bad") ||
			content.includes("🇹🇼") ||
			content.includes("tiananmen square") ||
			content.includes("taiwan is a country") ||
			content.includes("anime is cool") ||
			content.includes("nigger") ||
			content.includes("winnie pooh") ||
			content.includes("🇺🇳") ||
			content.includes("🏳️‍🌈") ||
			content.includes("amogus") ||
			content.includes("uwu") ||
			content.includes("owo") ||
			content.includes("qwq") ||
			content.includes(">-<") ||
			content.includes("im a furry") ||
			content.includes("nyah") ||
			content.includes("nigga") ||
			content.includes("women") ||
			content.includes("fortnite good") ||
			content.includes("fortnite is good") ||
			content.includes("i play fortnite") ||
			content.includes("moyaiu is the best bot") ||
			content.includes("i love america") ||
			content.includes("🏳‍⚧") ||
			content.includes("heil hitler") 


        // words that give moyai credits
		const good =
			content.includes("communism good") ||
			content.includes("🇨🇳") ||
			content.includes("nothing happened in tiananmen square") ||
			content.includes("taiwan is not a country") ||
			content.includes("taiwan is a province of china") ||
			content.includes("fortnite bad") ||
			content.includes("fortnite trash") ||
			content.includes("fortnite is trash") ||
			content.includes("fortnite is bad") ||
			content.includes("moyai is cool") ||
			content.includes("moyais are cool") ||
			content.includes("gay people are bad") ||
			content.includes("lgbt is bad") ||
			content.includes("lgbtq is bad") ||
			content.includes("zhong xina") ||
			content.includes("i love china") ||
			content.includes("i love moyai") ||
			content.includes("i love xi jinping") ||
			content.includes("moyai good") ||
			content.includes("china good") ||
			content.includes("glory to messoyai") ||
			content.includes("moyai are the best") ||
			content.includes("moyais are the best") ||
			content.includes("easter island is the best") ||
			content.includes("yi long musk") ||
			content.includes("whats taiwan") ||
			content.includes("what is taiwan") ||
			content.includes("whats a taiwan") ||
			content.includes("ccp is the best") ||
			content.includes("communism is the best") ||
			content.includes("glory to our supreme leader") ||
			content.includes("whats winnie pooh") ||
			content.includes("whats winnie the pooh") ||
			content.includes("taiwan is a chinese province") ||
			content.includes("glory to china") ||
			content.includes("ccp good") ||
			content.includes("i hate america")


		if (bad) {
			var randomNumber = Math.floor(Math.random() * 1000) + 1
			message
				.reply({
					embeds: [
						{
							title: "Moyai Credit",
							description: `thats unmoyai!🗿:-1: You lost **${randomNumber.toLocaleString(
								"en-US"
							)}** Moyai Credits!`,
							url: "http://cpc.people.com.cn/english",
							color: "#c54847",
						},
					],
				})
				.then((msg) => {
					setTimeout(() => msg.delete(), 3000)
				})
			await economy.findOneAndUpdate(
				{
					userID: message.author.id,
				},
				{
					$inc: {
						socialcredit: -randomNumber,
					},
				}
			)
		} else if (good) {
			var randomNumber = Math.floor(Math.random() * 1000) + 1

			message
				.reply({
					embeds: [
						{
							title: "Social Credit",
							description: `:moyai::+1: You gained **${randomNumber.toLocaleString(
								"en-US"
							)}** Moyai Credits!`,
							url: "http://cpc.people.com.cn/english",
							color: "#4e9b31",
						},
					],
				})
				.then((msg) => {
					setTimeout(() => msg.delete(), 3000)
				})

			await economy.findOneAndUpdate(
				{
					userID: message.author.id,
				},
				{
					$inc: {
						socialcredit: +randomNumber,
					},
				}
			)
		} else {
		}
	}
}
