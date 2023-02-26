const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cuddle")
        .setDescription("Cuddle someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to cuddle.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b50fWX.gif',
            'https://iili.io/b50qsn.gif',
            'https://iili.io/b50Cfs.gif',
            'https://iili.io/b50n0G.gif',
            'https://iili.io/b50ogf.gif',
            'https://iili.io/b50zJ4.gif',
            'https://iili.io/b50I5l.gif',
            'https://iili.io/b50Te2.gif',
            'https://iili.io/b50ubS.gif',
            'https://iili.io/b50Rz7.gif',
            'https://iili.io/b507se.gif',
            'https://iili.io/b50aqu.gif',
            'https://iili.io/b50c0b.gif',
            'https://iili.io/b50lgj.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Cuddle`, user, Mention, `${member} cuddles ${pingText}!`, image, false)

    }
}