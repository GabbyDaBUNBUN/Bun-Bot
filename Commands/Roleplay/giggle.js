const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("giggle")
        .setDescription("Giggle.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are giggling.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5E5Ku.gif',
            'https://iili.io/b5E7cb.gif',
            'https://iili.io/b5EcHx.gif',
            'https://iili.io/b5ElAQ.gif',
            'https://iili.io/b5E0NV.gif',
            'https://iili.io/b5E1DB.gif',
            'https://iili.io/b5EGoP.gif',
            'https://iili.io/b5EMV1.gif',
            'https://iili.io/b5EViF.gif',
            'https://iili.io/b5EXKg.gif',
            'https://iili.io/b5Ehla.gif',
            'https://iili.io/b5EjUJ.gif',
            'https://iili.io/b5ENHv.gif',
            'https://iili.io/b5EORR.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Giggle`, user, Mention, `${member} giggles ${pingText}!`, image, false)

    }
}