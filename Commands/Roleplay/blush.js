const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("blush")
        .setDescription("Blush.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show that you are blushing.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5aJJ2.gif',
            'https://iili.io/b5adRS.gif',
            'https://iili.io/b5a2O7.gif',
            'https://iili.io/b5a3b9.gif',
            'https://iili.io/b5aKxe.gif',
            'https://iili.io/b5afWu.gif',
            'https://iili.io/b5aqib.gif',
            'https://iili.io/b5aCfj.gif',
            'https://iili.io/b5an0x.gif',
            'https://iili.io/b5aoUQ.gif',
            'https://iili.io/b5azJV.gif',
            'https://iili.io/b5aI5B.gif',
            'https://iili.io/b5aTOP.gif',
            'https://iili.io/b5aub1.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Blush`, user, Mention, `${member} blushes ${pingText}!`, image, false)

    }
}