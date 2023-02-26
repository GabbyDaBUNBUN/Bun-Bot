const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nope")
        .setDescription("Says nope.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell nope to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRYadN.gif',
            'https://iili.io/bRYc7I.gif',
            'https://iili.io/bRYlet.gif',
            'https://iili.io/bRY0mX.gif',
            'https://iili.io/bRYEIn.gif',
            'https://iili.io/bRYGXs.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Nope`, user, Mention, `${member} says nope ${pingText}!`, image, false)

    }
}