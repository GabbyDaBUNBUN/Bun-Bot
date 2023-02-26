const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("good-morning")
        .setDescription("Say good morning.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell good morning.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5Ebs9.gif',
            'https://iili.io/b5Epfe.gif',
            'https://iili.io/b5Ey0u.gif',
            'https://iili.io/b5G9Ub.gif',
            'https://iili.io/b5Gd5x.gif',
            'https://iili.io/b5G2OQ.gif',
            'https://iili.io/b5G3bV.gif',
            'https://iili.io/b5GKzB.gif',
            'https://iili.io/b5GfWP.gif',
            'https://iili.io/b5Gqs1.gif',
            'https://iili.io/b5GCqF.gif',
            'https://iili.io/b5Gn0g.gif',
            'https://iili.io/b5Goga.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Good Morning`, user, Mention, `${member} says good morning! ${pingText}!`, image, false)

    }
}