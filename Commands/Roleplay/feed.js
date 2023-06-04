const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("feed")
        .setDescription("Feed someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to feed.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/23158e92-3cc9-4488-bc26-9dc6ba6a1d06/feed.gif',
            'https://ucarecdn.com/ffd285f4-272f-4d1b-8bb7-d03658f920a7/feed3.gif',
            'https://ucarecdn.com/cf0a135b-fd5e-464e-87d3-17df19e1c03a/feed2.gif',
            'https://ucarecdn.com/fc46ac41-243e-40aa-9d44-1ebe811ec7ae/feed5.gif',
            'https://ucarecdn.com/c4df6c1c-e102-4292-9b5f-596dc403dc2f/feed4.gif',
            'https://ucarecdn.com/6aea1bf4-1ad0-4f53-b4ad-8801cce3769a/feed1.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Feed`, user, Mention, `${member} feeds ${pingText}!`, image, false)

    }
}