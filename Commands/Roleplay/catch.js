const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("catch")
        .setDescription("Catch someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to catch.").setRequired(false))
        .addStringOption(opt => opt.setName("text").setDescription("Message you want to say.").setRequired(false)),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { user, member, options } = interaction

        const Text = options.getString("text") || ``
        const Mention = options.getUser("user") || ``
        const pingText = `${Mention} ${Text}`

        const gifs = [ 'https://ucarecdn.com/2cfa686c-d605-4368-bd9e-1776cc433455/catch1.gif',
            'https://ucarecdn.com/ff638086-a6e8-478a-842f-19c0f8d10af6/catch.gif',
            'https://ucarecdn.com/3cceb427-3986-4c86-98ee-d8e8845f54c9/catch3.gif',
            'https://ucarecdn.com/b2904957-01db-4443-8a18-a4a8d0aa7e09/catch2.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Catch`, user, Mention, `${member} catches ${pingText}!`, image, false)

    }
}