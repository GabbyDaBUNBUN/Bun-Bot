const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shy")
        .setDescription("Be shy.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are shy to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5XxCN.gif',
            'https://iili.io/b5XzGI.gif',
            'https://iili.io/b5XI4t.gif',
            'https://iili.io/b5Xu3X.gif',
            'https://iili.io/b5XAan.gif',
            'https://iili.io/b5XRvs.gif',
            'https://iili.io/b5X5yG.gif',
            'https://iili.io/b5XYuf.gif',
            'https://iili.io/b5Xaj4.gif',
            'https://iili.io/b5XcZl.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Shy`, user, Mention, `${member} is shy ${pingText}!`, image, false)

    }
}