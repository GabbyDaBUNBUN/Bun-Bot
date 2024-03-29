const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hug")
        .setDescription("Hug someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to hug.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/10a62c41-e25a-4835-8e21-e82cd68223b5/hug5.gif',
            'https://ucarecdn.com/e11bd51e-76db-401c-ad6f-7458cbf04999/hug.gif',
            'https://ucarecdn.com/2fce35a1-5484-427f-8b1f-e2a6f77617b2/hug1.gif',
            'https://ucarecdn.com/d755d69e-47b2-4544-b175-fbe7f7adfca5/hug2.gif',
            'https://ucarecdn.com/85faaded-144b-46a6-be4e-855c276a2885/hug4.gif',
            'https://ucarecdn.com/4dc8883d-78aa-4efd-b65c-4710b9d58ff9/hug3.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Hug`, user, Mention, `${member} hugs ${pingText}!`, image, false)

    }
}