const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hide")
        .setDescription("Hide from someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to hide from.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRTIzx.gif',
            'https://iili.io/bRTTWQ.gif',
            'https://iili.io/bRTusV.gif',
            'https://iili.io/bRTRqB.gif',
            'https://iili.io/bRT50P.gif',
            'https://iili.io/bRT7g1.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Hide`, user, Mention, `${member} hides ${pingText}!`, image, false)

    }
}