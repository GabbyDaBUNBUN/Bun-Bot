const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pout")
        .setDescription("Pout.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to pout to.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5WaqP.gif',
            'https://iili.io/b5Wc11.gif',
            'https://iili.io/b5WlrF.gif',
            'https://iili.io/b5W1dg.gif',
            'https://iili.io/b5WE7a.gif',
            'https://iili.io/b5WGkJ.gif',
            'https://iili.io/b5WMmv.gif',
            'https://iili.io/b5WWIR.gif',
            'https://iili.io/b5WXXp.gif',
            'https://iili.io/b5WhLN.gif',
            'https://iili.io/b5WwBI.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Pout`, user, Mention, `${member} pouts ${pingText}!`, image, false)

    }
}