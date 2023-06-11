const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nope")
        .setDescription("Says nope.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell nope to.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/8a789822-ceda-4b2d-8a76-d70a42540e5d/nope4.gif',
            'https://ucarecdn.com/29af9c13-b40a-42ec-a1cf-1f99cc24dba1/nope3.gif',
            'https://ucarecdn.com/730fe684-16f6-4d6b-9366-472fb7ba0708/nope5.gif',
            'https://ucarecdn.com/042f613b-9410-46a2-8e74-d17dac042c3d/nope.gif',
            'https://ucarecdn.com/90f648c4-425e-4cf2-90fc-9488e8051b83/nope1.gif',
            'https://ucarecdn.com/ff322ca0-195f-4c4f-a2a9-4874185e8546/nope2.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Nope`, user, Mention, `${member} says nope ${pingText}!`, image, false)

    }
}