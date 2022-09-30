const Discord = require("discord.js")
const Levels = require("discord-xp")
const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	name: "rank",
	cooldown: 30,
	category: "Level",
	data: new SlashCommandBuilder()
		.setName("rank")
		.setDescription("Sends a RankCard")
		.addUserOption((option) => option.setName("target").setDescription("The target user").setRequired(false)),
	async execute(client, interaction) {
		const img = [
			"https://www.zastavki.com/pictures/originals/2015/Creative_Wallpaper_Funny_statues_on_Easter_Island_103884_.jpg",
			"https://www.hdwallpaper.nu/wp-content/uploads/2016/06/Easter_Island_wallpaper18.jpg",
			"https://wallpapercave.com/wp/yZKEdh5.jpg",
			"http://crazy-frankenstein.com/free-wallpapers-files/monument/easter-island-heads-wallpapers/easter-island-heads-statue-wallpapers-1920x1200.jpg",
			"https://www.wallpaperflare.com/static/655/810/564/night-universe-easter-island-monuments-wallpaper.jpg",
			"https://www.hdwallpaper.nu/wp-content/uploads/2016/06/Easter_Island_wallpaper17.jpg",
			"https://wallpapercave.com/wp/RIJjL5e.jpg",
			"https://cdn.discordapp.com/avatars/728324557290602576/bd89665a315af7e8354676cfeea4ba21.png?size=4096",
			"https://cdn.discordapp.com/attachments/953688030487670815/984650082618048552/unknown.png",
			"https://cdn.discordapp.com/attachments/953688030487670815/977228448927977482/IMG_2515.jpg",
			"https://cdn.discordapp.com/attachments/953688030487670815/975535535995093023/IMG_2449.jpg",
			"https://cdn.discordapp.com/attachments/953688030487670815/973288325815365732/unknown.png"
		]
		var imgs = Math.floor(Math.random() * img.length)

		const target = interaction.options.getUser("target") || interaction.user
		const user = await Levels.fetch(target.id, interaction.guild.id, true)
		if (!user)
			return interaction.reply({
				content: "This user has no XP!",
				ephemeral: true,
			})
		const canvacord = require("canvacord")
		const rank = new canvacord.Rank()
			.setAvatar(target.displayAvatarURL({ size: 512, format: "png" }))
			.setBackground("IMAGE", `${img[imgs]}`)
			.setCurrentXP(user.cleanXp)
			.setRequiredXP(user.cleanNextLevelXp)
			.setRank(user.position)
			.setLevel(user.level)
			.setStatus(interaction.guild.members.cache.get(target.id).presence?.status ?? "offline", true)
			.setProgressBar("#7289da")
			.setProgressBarTrack("#2E3338")
			.setUsername(target.username)
			.setDiscriminator(target.discriminator)
			.setOverlay("#292B2F", 0.4)
			.renderEmojis(true)
		rank.build().then((data) => {
			const attachment = new Discord.MessageAttachment(data, "RankCard.png")
			interaction.reply({ files: [attachment] })
		})
	},
}
