const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("blow-kiss")
        .setDescription("Blow a kiss to someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to blow a kiss to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5YSVa.gif',
            'https://iili.io/b5YUiJ.gif',
            'https://iili.io/b5YrKv.gif',
            'https://iili.io/b5Y4lR.gif',
            'https://iili.io/b5Y6Sp.gif',
            'https://iili.io/b5YiHN.gif',
            'https://iili.io/b5YsRI.gif',
            'https://iili.io/b5YLNt.gif',
            'https://iili.io/b5YQDX.gif',
            'https://iili.io/b5Ytxn.gif',
            'https://iili.io/b5YDVs.gif',
            'https://iili.io/b5YbiG.gif',
            'https://iili.io/b5Ypff.gif',
            'https://iili.io/b5Yyl4.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Blow Kiss`, user, Mention, `${member} blows a kiss ${pingText}!`, image, false)

    }
}