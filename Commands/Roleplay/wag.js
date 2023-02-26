const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wag")
        .setDescription("Wag your tail.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show that you are wagging your tail to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5hNJn.gif',
            'https://iili.io/b5hORs.gif',
            'https://iili.io/b5heOG.gif',
            'https://iili.io/b5hkbf.gif',
            'https://iili.io/b5h8x4.gif',
            'https://iili.io/b5hSWl.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Wag`, user, Mention, `${member} wags their tail ${pingText}!`, image, false)

    }
}