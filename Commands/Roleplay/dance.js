const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dance")
        .setDescription("Dance with someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to dance with.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b50wqg.gif',
            'https://iili.io/b50N1a.gif',
            'https://iili.io/b50OrJ.gif',
            'https://iili.io/b50kdv.gif',
            'https://iili.io/b50v7R.gif',
            'https://iili.io/b508ep.gif',
            'https://iili.io/b50SmN.gif',
            'https://iili.io/b50gII.gif',
            'https://iili.io/b50rXt.gif',
            'https://iili.io/b504LX.gif',
            'https://iili.io/b50PBn.gif',
            'https://iili.io/b50srG.gif',
            'https://iili.io/b50Q2f.gif',
            'https://iili.io/b50Z74.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Dance`, user, Mention, `${member} dances ${pingText}!`, image, false)

    }
}