const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pick-up")
        .setDescription("Pick up someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to pick up.").setRequired(false))
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

        const gifs = [ 'https://iili.io/bRYep9.gif',
            'https://iili.io/bRYvIe.gif',
            'https://iili.io/bRY8hu.gif',
            'https://iili.io/bRYSLb.gif',
            'https://iili.io/bRYgBj.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Pick Up`, user, Mention, `${member} picks up ${pingText}!`, image, false)

    }
}