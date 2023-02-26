const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("heal")
        .setDescription("Heal someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to heal.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRILVp.gif',
            'https://iili.io/bRIQiN.gif',
            'https://iili.io/bRItfI.gif',
            'https://iili.io/bRIDlt.gif',
            'https://iili.io/bRT2Wl.gif',
            'https://iili.io/bRT3s2.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Heal`, user, Mention, `${member} heals ${pingText}!`, image, false)

    }
}