const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poke")
        .setDescription("Poke someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to poke.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5WfX2.gif',
            'https://iili.io/b5WqsS.gif',
            'https://iili.io/b5WCq7.gif',
            'https://iili.io/b5Wn19.gif',
            'https://iili.io/b5Woge.gif',
            'https://iili.io/b5Wzdu.gif',
            'https://iili.io/b5WI5b.gif',
            'https://iili.io/b5WTej.gif',
            'https://iili.io/b5Wumx.gif',
            'https://iili.io/b5WRzQ.gif',
            'https://iili.io/b5W5XV.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Poke`, user, Mention, `${member} pokes ${pingText}!`, image, false)

    }
}