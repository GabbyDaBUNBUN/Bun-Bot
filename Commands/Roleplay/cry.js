const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cry")
        .setDescription("Cry.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are crying.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5l4lj.gif',
            'https://iili.io/b5l6Ux.gif',
            'https://iili.io/b5liHQ.gif',
            'https://iili.io/b5lsRV.gif',
            'https://iili.io/b5lLOB.gif',
            'https://iili.io/b5lQDP.gif',
            'https://iili.io/b5ltx1.gif',
            'https://iili.io/b5lDWF.gif',
            'https://iili.io/b5lbig.gif',
            'https://iili.io/b5lpfa.gif',
            'https://iili.io/b5ly0J.gif',
            'https://iili.io/b509Uv.gif',
            'https://iili.io/b50JJR.gif',
            'https://iili.io/b50dRp.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Cry`, user, Mention, `${member} cries ${pingText}!`, image, false)

    }
}