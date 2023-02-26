const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("run")
        .setDescription("Run away.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to run away from.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5Wv7s.gif',
            'https://iili.io/b5W8kG.gif',
            'https://iili.io/b5WSpf.gif',
            'https://iili.io/b5WgI4.gif',
            'https://iili.io/b5Wrhl.gif',
            'https://iili.io/b5W4Q2.gif',
            'https://iili.io/b5WPBS.gif',
            'https://iili.io/b5WiE7.gif',
            'https://iili.io/b5Ws49.gif',
            'https://iili.io/b5WQ2e.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Run`, user, Mention, `${member} runs away ${pingText}!`, image, false)

    }
}