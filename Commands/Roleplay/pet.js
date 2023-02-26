const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pet")
        .setDescription("Pet someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to pat.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5Vtxp.gif',
            'https://iili.io/b5VDWN.gif',
            'https://iili.io/b5VbsI.gif',
            'https://iili.io/b5Vpft.gif',
            'https://iili.io/b5Vy0X.gif',
            'https://iili.io/b5W9gn.gif',
            'https://iili.io/b5WJJs.gif',
            'https://iili.io/b5Wd5G.gif',
            'https://iili.io/b5W2ef.gif',
            'https://iili.io/b5W3b4.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Pet`, user, Mention, `${member} pets ${pingText}!`, image, false)

    }
}