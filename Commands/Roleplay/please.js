const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("please")
        .setDescription("Say please.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to say please to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRa2pt.gif',
            'https://iili.io/bRaFTX.gif',
            'https://iili.io/bRaKjn.gif',
            'https://iili.io/bRafQs.gif',
            'https://iili.io/bRaBCG.gif',
            'https://iili.io/bRaCGf.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Please`, user, Mention, `${member} says please please please ${pingText}!`, image, false)

    }
}