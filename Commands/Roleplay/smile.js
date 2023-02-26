const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("smile")
        .setDescription("Smile.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to smile at.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5X0n2.gif',
            'https://iili.io/b5X1GS.gif',
            'https://iili.io/b5XE67.gif',
            'https://iili.io/b5XMF9.gif',
            'https://iili.io/b5XVae.gif',
            'https://iili.io/b5XW8u.gif',
            'https://iili.io/b5XXyb.gif',
            'https://iili.io/b5Xjuj.gif',
            'https://iili.io/b5Xwwx.gif',
            'https://iili.io/b5XNZQ.gif',
            'https://iili.io/b5XenV.gif',
            'https://iili.io/b5XkMB.gif',
            'https://iili.io/b5Xv6P.gif',
            'https://iili.io/b5XSF1.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Smile`, user, Mention, `${member} smiles ${pingText}!`, image, false)

    }
}