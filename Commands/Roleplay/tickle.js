const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tickle")
        .setDescription("Tickle someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tickle.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5hToQ.gif',
            'https://iili.io/b5huVV.gif',
            'https://iili.io/b5hAiB.gif',
            'https://iili.io/b5h5KP.gif',
            'https://iili.io/b5h7l1.gif',
            'https://iili.io/b5hYUF.gif',
            'https://iili.io/b5hcHg.gif',
            'https://iili.io/b5hlRa.gif',
            'https://iili.io/b5h0OJ.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Tickle`, user, Mention, `${member} tickles ${pingText}!`, image, false)

    }
}