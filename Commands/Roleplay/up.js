const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("up")
        .setDescription("Ask to be picked up.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to pick you up.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRhgCN.gif',
            'https://iili.io/bRhrGI.gif',
            'https://iili.io/bRh44t.gif',
            'https://iili.io/bRhP3X.gif',
            'https://iili.io/bRhian.gif',
            'https://iili.io/bRhsvs.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Uppies`, user, Mention, `${member} is asking for uppies ${pingText}!`, image, false)

    }
}