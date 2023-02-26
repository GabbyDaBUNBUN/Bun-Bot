const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("overwhelmed")
        .setDescription("Tell others you are overwhelmed.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell you are overwhelmed.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRYMLG.gif',
            'https://iili.io/bRYWBf.gif',
            'https://iili.io/bRYX14.gif',
            'https://iili.io/bRYhrl.gif',
            'https://iili.io/bRYw22.gif',
            'https://iili.io/bRYN7S.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Overwhelmed`, user, Mention, `${member} is overwhelmed ${pingText}!`, image, false)

    }
}