const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sip")
        .setDescription("Sip a drink.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are sipping.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRMAUG.gif',
            'https://iili.io/bRMYOl.gif',
            'https://iili.io/bRMlxS.gif',
            'https://iili.io/bRM0W7.gif',
            'https://iili.io/bRMGfe.gif',
            'https://iili.io/bRMM0u.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Sip`, user, Mention, `${member} sips a refreshing drink ${pingText}!`, image, false)

    }
}