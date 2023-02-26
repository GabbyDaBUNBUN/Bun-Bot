const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("boop")
        .setDescription("Boop someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to boop.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5aOg4.gif',
            'https://iili.io/b5akdl.gif',
            'https://iili.io/b5av72.gif',
            'https://iili.io/b5a8eS.gif',
            'https://iili.io/b5aSm7.gif',
            'https://iili.io/b5agI9.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Boop`, user, Mention, `${member} boops ${pingText}!`, image, false)

    }
}