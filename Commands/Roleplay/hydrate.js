const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hydrate")
        .setDescription("Tell somone to hydrate.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to remind to stay hydrated.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bR7f9t.gif',
            'https://iili.io/bR7qAX.gif',
            'https://iili.io/bR7BNn.gif',
            'https://iili.io/bR7Cts.gif',
            'https://iili.io/bR7ooG.gif',
            'https://iili.io/bR7xVf.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Hydrate`, user, Mention, `${member} says don't forget to drink some water ${pingText}!`, image, false)

    }
}