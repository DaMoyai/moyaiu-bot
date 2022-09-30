const {
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
} = require("discord.js")
const economy = require("../models/user.js")
const settings = require("../models/settings.js")
const cooldowns = new Map()
const Discord = require("discord.js")

module.exports = async (client, interaction) => {
	//! Database
	//* Guild Settings
	let guildData = await settings.findOne({
		guildID: interaction.guild.id,
	})
	if (!guildData) {
		const serverData = await settings.create({
			guildID: interaction.guild.id,
		})
		await serverData.save().catch((e) => {
			console.log(e)
		})
		guildData = await settings.findOne({ guildID: interaction.guild.id })
	}
	if (interaction.isCommand()) {
		const command = client.commands.get(interaction.commandName)
		// cooldown thing
		if (!command) return
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection())
		}
		// permission thing
		if (!interaction.member.permissions.has(command.perms || [])) {
			return await interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Missing Permissions",
						description: `you need the \`${command.perms}\` permission to use this command 🗿`,
						color: "#f04747",
					},
				],
			})
		}
		if (!interaction.guild.me.permissions.has(command.botPerms || [])) {
			return await interaction.reply({
				ephemeral: true,
				embeds: [
					{
						title: "Error",
						description: `i need the \`${command.botPerms}\` permission to execute this command 🗿`,
						color: "#f04747",
					},
				],
			})
		}
		//permission thign again
		var now = Date.now()
		let timeStamp = cooldowns.get(command.name) || new Collection()
		let cool = command.cooldown || 5
		let userCool = timeStamp.get(interaction.user.id) || 0
		let estimated = userCool + cool * 1000 - now

		if (userCool && estimated > 0) {
			const co = command.cooldown || 5
			const usercooldown = timeStamp.get(interaction.user.id) || 0
			const remaining = usercooldown + co * 1000
			const embed = new Discord.MessageEmbed()
				.setDescription(
					`<:messoyai:986907424562749450> Messoyai allows you to use **/${
						command.name
					}** again in **${(estimated / 1000).toFixed()}** seconds`
				)
				.setTitle("Cooldown")
				.setColor("RANDOM")
			return await interaction.reply({ embeds: [embed], ephemeral: true })
		}

		timeStamp.set(interaction.user.id, now)
		cooldowns.set(command.name, timeStamp)

		// error
		try {
			await command.execute(client, interaction, userData, guildData)
		} catch (error) {
			console.error(error)
			interaction
				.reply({
					ephemeral: true,
					embeds: [
						{
							url: "https://youtu.be/ueIZMGoStVs",
							title: "oh no an error",
							color: "#f04747",
							//	description: `Please report this message to the support server: \`\`\`js\n${error}\`\`\` \n`,
							description: `imagine lmao`,
						},
					],
				})
				.catch(
					interaction.followUp({
						ephemeral: true,
						embeds: [
							{
								title: "oh no an error",
								color: "#f04747",
								//	description: `Please report this message to the support server: \`\`\`js\n${error}\`\`\` \n`,
								description: `imagine`,
							},
						],
					})
				)
		}
	}
}
