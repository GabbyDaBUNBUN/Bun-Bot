const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")
const PickDB = require("../../Structures/Schemas/PickDB")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pick")
        .setDescription("Pick coins."),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { guild, member } = interaction
        const { color } = client

        let pickData = await PickDB.findOne({ Guild: guild.id }).catch(err => { })
        let economyData = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })

        if (pickData.OpenWindow === true) {

            let coinAmount = [ `1`, `2`, `3`, `4`, `5` ]
            let coins = coinAmount[ Math.floor(Math.random() * coinAmount.length) ]

            let userBalance = economyData.Balance
            userBalance = userBalance + coins

            const Embed = new EmbedBuilder()
                .setColor(color)
                .setTitle("Hurray!")
                .setDescription(`You have picked ${coins} 🪙's!`)
                .setFooter({ text: "Pick by Bun Bot" })
                .setTimestamp()

            interaction.reply({ embeds: [ Embed ] }).then(msg => {
                setTimeout(() => msg.delete(), 10000)
            }).catch(err => { })

        } else if (pickData.OpenWindow === false) {

            const Embed = new EmbedBuilder()
                .setColor(color)
                .setTitle("Uh Oh!")
                .setDescription(`There is nothing to pick right now!`)
                .setFooter({ text: "Pick by Bun Bot" })
                .setTimestamp()

            interaction.reply({ embeds: [ Embed ] }).then(msg => {
                setTimeout(() => msg.delete(), 10000)
            }).catch(err => { })

        }

    }
}