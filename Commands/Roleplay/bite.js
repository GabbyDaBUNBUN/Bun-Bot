const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bite")
        .setDescription("Bite someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to bite").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5YMMb.gif',
            'https://iili.io/b5YVPj.gif',
            'https://iili.io/b5YXKx.gif',
            'https://iili.io/b5YhcQ.gif',
            'https://iili.io/b5YjSV.gif',
            'https://iili.io/b5YNHB.gif',
            'https://iili.io/b5YOAP.gif',
            'https://iili.io/b5YeN1.gif',
            'https://iili.io/b5YkDF.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Bite`, user, Mention, `${member} bites ${pingText}!`, image, false)

    }
}