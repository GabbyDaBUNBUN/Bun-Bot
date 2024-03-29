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

        const gifs = [ 'https://ucarecdn.com/2b264bbc-9a8b-4d96-90f9-e72e489d1805/dance.gif',
            'https://ucarecdn.com/4aba841a-40ff-4ed9-84a4-3853a0b47e5a/dance4.gif',
            'https://ucarecdn.com/ddf41c6c-afbf-48f4-a5dc-6560abc69d62/dance8.gif',
            'https://ucarecdn.com/3056d9c4-a000-451d-be53-a1d038ac7dab/dance9.gif',
            'https://ucarecdn.com/c5a24320-ae21-414a-a980-7a8355b1b82b/dance7.gif',
            'https://ucarecdn.com/79af98ee-3166-4f98-b3c2-6eede5731355/dance1.gif',
            'https://ucarecdn.com/0f454772-bc3e-4482-98df-6fedf6f26330/dance2.gif',
            'https://ucarecdn.com/18b1376c-0907-4e1a-88e9-23929afb0ff8/dance5.gif',
            'https://ucarecdn.com/12f5e38c-f3c5-411c-ad06-8b4ad67485d8/dance3.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Dance`, user, Mention, `${member} dances ${pingText}!`, image, false)

    }
}