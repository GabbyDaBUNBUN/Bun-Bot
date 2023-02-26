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

        const gifs = [ 'https://iili.io/b5cYT7.gif',
            'https://iili.io/b5caj9.gif',
            'https://iili.io/b5ccQe.gif',
            'https://iili.io/b5c1Eb.gif',
            'https://iili.io/b5cE4j.gif',
            'https://iili.io/b5cM3x.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Catch`, user, Mention, `${member} catches ${pingText}!`, image, false)

    }
}