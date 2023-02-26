const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pat")
        .setDescription("Pat someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to pat.").setRequired(false))
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

        const gifs = [ 'https://iili.io/b5Vrf1.gif',
            'https://iili.io/b5V40F.gif',
            'https://iili.io/b5V6Ug.gif',
            'https://iili.io/b5ViJa.gif',
            'https://iili.io/b5Vs5J.gif',
            'https://iili.io/b5VLOv.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Pat`, user, Mention, `${member} pats ${pingText}!`, image, false)

    }
}