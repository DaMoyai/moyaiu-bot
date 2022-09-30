const { SlashCommandBuilder } = require("@discordjs/builders")
const wait = require("util").promisify(setTimeout)

module.exports = {
	name: "hack",
	category: "Fun",
	cooldown: 60,
	data: new SlashCommandBuilder()
		.setName("hack")
		.setDescription("hack someone 🗿")
		.addStringOption((option) => option.setName("target").setDescription("The target user").setRequired(true)),
	async execute(client, interaction, userData, guildData) {
		if (guildData.socialcredit) {
			if (userData.socialcredit < 100000) {
				return interaction.reply({
					ephemeral: true,
					content: "you dont have enough socialcredit",
				})
			}
		}
		await interaction.reply("Preparing...")
		await wait(3000)
		await interaction.editReply("injecting spyware...")
		await wait(1000)
		await interaction.editReply("searching private info...")
		await wait(1000)
		await interaction.editReply("decrypting data...")
		await wait(2000)
		await interaction.editReply(`sending data to ${interaction.guild.name}`)
		await wait(1000)
		await interaction.editReply(`‎`)
		var nam = [
			"Michael",
			"Chris",
			"Max",
			"Ben",
			"Carl",
			"James",
			"John",
			"Susan",
			"Mary",
			"Elizabeth",
			"David",
			"Kevin",
			"Gary",
			"Sandra",
			"Nancy",
			"Tim",
			"Joe",
			"Barack",
			"Obama",
			"Trump",
			"Musk",
			"Donald",
			"Luke",
			"Pepe",
			"Mario",
			"Luigi",
			"Toad",
			"Addison",
			"Clint",
			"Joris",
			"Samuel",
			"Anon",
			"Link",
			"Mr.",
		]
		var name = Math.floor(Math.random() * nam.length)
		var sur = [
			"Pratt",
			"Franz",
			"Elon",
			"Trump",
			"Obama",
			"Yoda",
			"Simpsons",
			"Stark",
			"Edwards",
			"Novikov",
			"Cena",
			"Mario",
			"Toadstool",
			"Moyai",
			"Unmoyai",
			"Morbius",
			"Breast",
		]
		var sure = Math.floor(Math.random() * sur.length)
		var ip = Math.floor(Math.random() * 255)
		var ip2 = Math.floor(Math.random() * 254)
		var ip3 = Math.floor(Math.random() * 253)
		var ip4 = Math.floor(Math.random() * 252)
		var number = Math.floor(Math.random() * 99999999999)
		var num = Math.floor(Math.random() * 420)
		var pass = [
			"fortnite69",
			"P0RNiSc00lXOXOXOXOXO",
			"ILoveWumpus",
			"moyai",
			`${interaction.options.getString("target")}`,
			"ifuckedurmomlastnight",
			"CCP Is the Best 12345",
			"OURpassword",
			"Moyai is love, moyai is life.",
			"Password123",
			"I love m0m",
			"Anna",
			`I :heart: ${interaction.member.user.tag}`,
			"qwertz",
			"qwerty",
			"1234567890",
			"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
			"moyaiuBestBot",
			"Mr. Breast",
			"AhjKlHPjsnJNsj864839290",
			"AbCdEfG1234567",
			"AmoGuS69420s3x",
			"gayp0rnhub6969696969696969696969696969696969",
			"Jh987-02ked-07Rew-opR7a",
			"6 characters or more",
			"penisgohard"
		]
		var word = Math.floor(Math.random() * pass.length)
		const e = [
			"hello125@gmail.com",
			`${interaction.options.getString("target")}@gmail.com`,
			`official${interaction.options.getString("target")}@gmail.com`,
			"iloveloganpaul@gmail.com",
			"moyaibad@banned.mail",
			"nword@gmail.com",
			`${interaction.member.user.tag}@gmail.com`,
			`${nam[name]}@gmail.com`,
			`${nam[name]}${sur[sure]}@gmail.com`,
			"imcooluwu@yahoo.ma",
			"mamaaaaaaaaaaaamaaaaaaaaaaaaaaaaaaaa@mama.mam",
			`${interaction.options.getString("target")}@gmail.com`,
		]
		const mail = Math.floor(Math.random() * e.length)

		interaction.editReply({
			embeds: [
				{
					title: `${interaction.options.getString("target")} got hacked! \<:glitchoyai:923365933752418324>`,
					color: "RANDOM",
					timestamp: new Date(),

					fields: [
						{
							name: "IP-Address",
							value: `${ip}.${ip2}.${ip3}.${ip4}`,
							inline: true,
						},
						{
							name: "Telephone Number",
							value: `+${num} ${number}`,
							inline: true,
						},
						{
							name: "Full Name",
							value: `${nam[name]} ${sur[sure]}`,
							inline: true,
						},
						{
							name: "Password",
							value: `${pass[word]}`,
							inline: true,
						},
						{
							name: "E-Mail",
							value: `${e[mail]}`,
							inline: true,
						},
					],
				},
			],
		})
	},
}
