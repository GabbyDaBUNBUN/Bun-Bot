const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sorry")
        .setDescription("Say sorry to someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to say sorry to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRXbrF.gif',
            'https://iili.io/bRXpdg.gif',
            'https://iili.io/bRXy7a.gif',
            'https://iili.io/bRh9kJ.gif',
            'https://iili.io/bRhHmv.gif',
            'https://iili.io/bRhdIR.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Sorry`, user, Mention, `${member} says sorry ${pingText}!`, image, false)

    }
}