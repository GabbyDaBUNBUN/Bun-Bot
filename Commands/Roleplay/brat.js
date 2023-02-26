const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("brat")
        .setDescription("Throw a tantrum.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are throwing a tantrum.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5atkB.gif',
            'https://iili.io/b5aDmP.gif',
            'https://iili.io/b5amI1.gif',
            'https://iili.io/b5aphF.gif',
            'https://iili.io/b5ayLg.gif',
            'https://iili.io/b5cHBa.gif',
            'https://iili.io/b5cJEJ.gif',
            'https://iili.io/b5cdrv.gif',
            'https://iili.io/b5c32R.gif',
            'https://iili.io/b5cF7p.gif',
            'https://iili.io/b5cKkN.gif',
            'https://iili.io/b5cfpI.gif',
            'https://iili.io/b5cBIt.gif',
            'https://iili.io/b5cChX.gif',
            'https://iili.io/b5cnQn.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Brat`, user, Mention, `${member} throws a tantrum ${pingText}!`, image, false)

    }
}