const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sleepy")
        .setDescription("Tell others you are sleepy.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell you are sleepy.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRWvSa.gif',
            'https://iili.io/bRWSHJ.gif',
            'https://iili.io/bRWUAv.gif',
            'https://iili.io/bRWgNR.gif',
            'https://iili.io/bRW6oN.gif',
            'https://iili.io/bRWiPt.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Sleepy`, user, Mention, `${member} is sleepy ${pingText}!`, image, false)

    }
}