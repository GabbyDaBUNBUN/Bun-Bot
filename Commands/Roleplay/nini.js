const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nini")
        .setDescription("Say good night.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell good night.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5Vztp.gif',
            'https://iili.io/b5VToN.gif',
            'https://iili.io/b5VuVI.gif',
            'https://iili.io/b5VAPt.gif',
            'https://iili.io/b5V5KX.gif',
            'https://iili.io/b5V7ln.gif',
            'https://iili.io/b5VYSs.gif',
            'https://iili.io/b5VcHG.gif',
            'https://iili.io/b5VlRf.gif',
            'https://iili.io/b5V0N4.gif',
            'https://iili.io/b5V1Dl.gif',
            'https://iili.io/b5VGx2.gif',
            'https://iili.io/b5VMVS.gif',
            'https://iili.io/b5VVi7.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Nini (Good Night)`, user, Mention, `${member} says good night ${pingText}!`, image, false)

    }
}