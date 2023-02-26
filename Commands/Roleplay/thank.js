const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("thank")
        .setDescription("Thank someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to say thank you to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5hJt4.gif',
            'https://iili.io/b5h2ol.gif',
            'https://iili.io/b5h3V2.gif',
            'https://iili.io/b5hFPS.gif',
            'https://iili.io/b5hfK7.gif',
            'https://iili.io/b5hql9.gif',
            'https://iili.io/b5hBSe.gif',
            'https://iili.io/b5hnHu.gif',
            'https://iili.io/b5hoAb.gif',
            'https://iili.io/b5hxNj.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Thank`, user, Mention, `${member} says thank you ${pingText}!`, image, false)

    }
}