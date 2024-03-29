const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hide")
        .setDescription("Hide from someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to hide from.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/35aa466d-d507-40a0-a1d5-bd32e0995e47/hide4.gif',
            'https://ucarecdn.com/77b2899c-b213-4934-86b4-77f8ac48c1b6/hide.gif',
            'https://ucarecdn.com/85f3d808-cb1e-4849-a274-763eff5fd636/hide5.gif',
            'https://ucarecdn.com/1423ca7c-234c-4ffe-97c0-a41346902ad1/hide3.gif',
            'https://ucarecdn.com/1a241981-8429-424a-a9e1-417a9465276a/hide2.gif',
            'https://ucarecdn.com/e1cbe5f5-4c3f-4707-a6c3-82de8b9c2aa8/hide1.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Hide`, user, Mention, `${member} hides ${pingText}!`, image, false)

    }
}