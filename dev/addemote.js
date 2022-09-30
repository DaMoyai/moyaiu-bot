//! broken, too lazy to fix

const Discord = require("discord.js")
let isUrl = require("is-url")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	name: "addemote",
	description: "u can basically steal an emote with this lmao",
	aliases: ["addemoji"],
	usage: "<emoji/url> [name]",
	category: "Misc",
	data: new SlashCommandBuilder()
		.setName("addemote")
		.setDescription("Add an emoji/emote")
		.addStringOption((option) => option.setName("emote").setDescription("URL or emoji").setRequired(true))
		.addStringOption((option) => option.setName("name").setDescription("Emoji name to set").setRequired(true)),
	async execute(client, interaction) {
		if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS"))
			return interaction.reply({
				embeds: [
					{
						title: "Add Emote",
						description: "You dont have the `Manage Emojis And Stickers` Permission",
						color: "f04747",
					},
				],
			})
		let type = ""
		let name = ""
		let emote = interaction.options.getString("emote").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
		if (emote) {
			emote = interaction.options.getString("emote")
			type = "emoji"
			name = interaction.options
				.getString("name")
				.replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi, "")
				.trim()
				.split(" ")[0]
		} else {
			emote = `${isUrl(interaction.options.getString("emote"))}`
			name = interaction.options.getString("name") //.find((arg) => arg != emote)
			type = "url"
		}
		let emoji = { name: "" }
		let Link
		if (type == "emoji") {
			emoji = Discord.Util.parseEmoji(emote)
			Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`
		} else {
			if (!name)
				return interaction.reply({
					embeds: [
						{
							title: "Add Emote",
							description: "Please provide a name",
							color: "f04747",
						},
					],
				})
			if (name.length > 32) {
				return interaction.reply({
					embeds: [
						{
							title: "Add Emote",
							description: "The name is too long",
							color: "f04747",
						},
					],
				})
			}
			Link = /*interaction.attachments.first() ? interaction.attachments.first().url :*/ emote
		}
		try {
			let e = await interaction.guild.emojis.create(`${Link}`, `${`${name || emoji.name}`}`)
			e
			return interaction.reply({
				embeds: [
					{
						title: "Add Emote",
						description: `Succesfully added ${emoji.name}`,
						color: "43b581",
					},
				],
			})
		} catch (err) {
			if (interaction.client.log) console.log(err)
			return interaction.reply(`\`❌\` An error occured`)
		}
	},
}
