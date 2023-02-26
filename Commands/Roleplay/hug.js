const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hug")
        .setDescription("Hug someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to hug.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5GDpR.gif',
            'https://iili.io/b5GmIp.gif',
            'https://iili.io/b5GphN.gif',
            'https://iili.io/b5GyQI.gif',
            'https://iili.io/b5MHBt.gif',
            'https://iili.io/b5MJEX.gif',
            'https://iili.io/b5Md4n.gif',
            'https://iili.io/b5M32s.gif',
            'https://iili.io/b5MFYG.gif',
            'https://iili.io/b5MKvf.gif',
            'https://iili.io/b5Mfp4.gif',
            'https://iili.io/b5MBTl.gif',
            'https://iili.io/b5MCj2.gif',
            'https://iili.io/b5MnQS.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Hug`, user, Mention, `${member} hugs ${pingText}!`, image, false)

    }
}