const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CountingDB = require("../../Structures/Schemas/CountingDB")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("highscore")
        .setDescription("Current counting highscore."),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { guild } = interaction

        const Data = await CountingDB.findOne({ Guild: guild.id })
        if (!Data) return

        const highScore = Data.HighScore

        const Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setTitle("High Score")
            .setDescription(`Current Counting High Score: \`${highScore}\``)
            .setFooter({ text: "Counting by Expression Bot" })
            .setTimestamp()

        interaction.reply({ embeds: [ Embed ] })

    }
}