const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("feed")
        .setDescription("Feed someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to feed.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b516uV.gif',
            'https://iili.io/b51PwB.gif',
            'https://iili.io/b51iZP.gif',
            'https://iili.io/b51Ln1.gif',
            'https://iili.io/b51QMF.gif',
            'https://iili.io/b51Z6g.gif',
            'https://iili.io/b51DFa.gif',
            'https://iili.io/b51bcJ.gif',
            'https://iili.io/b51m8v.gif',
            'https://iili.io/b51y9R.gif',
            'https://iili.io/b5E9up.gif',
            'https://iili.io/b5EHwN.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Feed`, user, Mention, `${member} feeds ${pingText}!`, image, false)

    }
}