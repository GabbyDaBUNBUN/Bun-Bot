const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("laugh")
        .setDescription("Laugh.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to laugh at.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/a0e72b55-7109-4f94-adf6-46ba7c5b7707/laugh.gif',
            'https://ucarecdn.com/07eca440-eb43-46ae-893c-c3c410b5bf22/laugh2.gif',
            'https://ucarecdn.com/f4e5b973-bf12-44af-84d7-01c3c0f85375/laugh5.gif',
            'https://ucarecdn.com/eef6a10f-4208-4ffb-ad5b-f40e08403d3d/laugh1.gif',
            'https://ucarecdn.com/2a6f7d50-de99-458f-af45-92914aa01c29/laugh4.gif',
            'https://ucarecdn.com/cd1db705-5227-42a9-92c4-6466eef04485/laugh3.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Laugh`, user, Mention, `${member} laughs ${pingText}!`, image, false)

    }
}