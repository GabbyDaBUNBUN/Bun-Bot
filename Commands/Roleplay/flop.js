const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flop")
        .setDescription("Do a flop.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are flopping.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRJdoG.gif',
            'https://iili.io/bRJ2Vf.gif',
            'https://iili.io/bRJ3P4.gif',
            'https://iili.io/bRJKKl.gif',
            'https://iili.io/bRJfl2.gif',
            'https://iili.io/bRJqSS.gif',
            'https://iili.io/b5EFPn.gif',
            'https://iili.io/b5EfFs.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Flop`, user, Mention, `${member} flops ${pingText}!`, image, false)

    }
}