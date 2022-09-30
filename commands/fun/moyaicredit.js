const { SlashCommandBuilder } = require("@discordjs/builders")
const economy = require("../../models/user.js")
const { MessageEmbed, MessageButton } = require("discord.js")

module.exports = {
    name: "shop",
    category: "Fun",
    data: new SlashCommandBuilder()
        .setName("moyaicredit")
        .setDescription("Glory to the CCP!")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("show")
                .setDescription("see someones social credit")
                .addUserOption((option) =>
                    option.setName("user").setDescription("the user to give cred to").setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("give")
                .setDescription("give someone ur credit")
                .addUserOption((option) =>
                    option.setName("user").setDescription("the user to give moyai cred to").setRequired(true)
                )
                .addNumberOption((option) =>
                    option.setName("amount").setDescription("the amount to give").setRequired(true)
                )
        ),
    /*	.addSubcommand((subcommand) =>
            subcommand.setName("test").setDescription("test urself every week for some credits")
        ) */
    async execute(client, interaction, userData) {
        var user = interaction.options.getUser("user")
        var socialCredit = userData.socialcredit
        var color = "7289da"

        if (interaction.options.getSubcommand() === "show") {
            if (!user) {
                if (socialCredit > 50000) {
                    color = "00ff00"
                }
                if (socialCredit < 10000) {
                    color = "ff8989"
                }
                if (socialCredit < 999) {
                    color = "f04747"
                }
                if (socialCredit < -1) {
                    color = "RED"
                }

                interaction.reply({
                    embeds: [
                        {
                            title: "Your moyai credit",
                            description: `${socialCredit.toLocaleString("en-US") }`,
                            url: "http://cpc.people.com.cn/english/",
                            color: `${color}`,
                        },
                    ],
                })
            } else {
                const otherCredit = await economy.findOne({
                    userID: user.id,
                })
                if (otherCredit.socialcredit < 10000) {
                    color = "#ff8989"
                }

                if (otherCredit.socialcredit > 50000) {
                    color = "#00ff00"
                }
                if (otherCredit.socialcredit < 999) {
                    color = "f04747"
                }
                if (otherCredit.socialcredit < -1) {
                    color = "ff0000"
                }
                interaction.reply({
                    embeds: [
                        {
                            title: `${user.tag}'s moyai credit`,
                            description: `${otherCredit.socialcredit.toLocaleString("en-US") }`,
                            color: `${color}`,
                            url: "http://cpc.people.com.cn/english/",
                        },
                    ],
                })
            }
        }
        if (interaction.options.getSubcommand() === "give") {
            const user = interaction.options.getUser("user")
            const amount = interaction.options.getNumber("amount")
            if (amount % 1 != 0 || amount <= 0) return interaction.reply("Deposit amount must be a full number dumbass")
            try {
                if (amount > socialCredit) return interaction.reply("you dont have that amount of credits 🤨")

                await economy.findOneAndUpdate(
                    {
                        userID: interaction.member.id,
                    },
                    {
                        $inc: {
                            socialcredit: -amount,
                        },
                    }
                )
                await economy.findOneAndUpdate(
                    {
                        userID: user.id,
                    },
                    {
                        $inc: {
                            socialcredit: amount,
                        },
                    }
                )
                return interaction.reply({
                    embeds: [
                        {
                            title: "Give",
                            description: `Gave **${amount.toLocaleString("en-US") }** Moyai Credits to ${user}`,
                            color: "#687dc6",
                            url: "http://cpc.people.com.cn/english",
                        },
                    ],
                })
            } catch (err) {
                console.log(err)
            }
        }
        if (interaction.options.getSubcommand() === "test") {
            interaction.reply({
                embeds: [
                    {
                        title: "Number 1",
                        description: "what is taiwan?",
                    },
                ],
            })
        }
    },
}