const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wake-up")
        .setDescription("Wake someone up.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to wake up.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRjHF9.gif',
            'https://iili.io/bRjJae.gif',
            'https://iili.io/bRjd8u.gif',
            'https://iili.io/bRj2yb.gif',
            'https://iili.io/bRjFuj.gif',
            'https://iili.io/bRjKwx.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Wake Up`, user, Mention, `${member} says wake up! wake up! wake up! ${pingText}!`, image, false)

    }
}