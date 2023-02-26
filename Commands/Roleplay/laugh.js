const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("laugh")
        .setDescription("Laugh.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to laugh at.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5Mv6X.gif',
            'https://iili.io/b5MSFn.gif',
            'https://iili.io/b5MUas.gif',
            'https://iili.io/b5Mg8G.gif',
            'https://iili.io/b5M49f.gif',
            'https://iili.io/b5M6u4.gif',
            'https://iili.io/b5MPwl.gif',
            'https://iili.io/b5Mit2.gif',
            'https://iili.io/b5MLnS.gif',
            'https://iili.io/b5MQM7.gif',
            'https://iili.io/b5MZP9.gif',
            'https://iili.io/b5MDFe.gif',
            'https://iili.io/b5Mbcu.gif',
            'https://iili.io/b5Mm8b.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Laugh`, user, Mention, `${member} laughs ${pingText}!`, image, false)

    }
}