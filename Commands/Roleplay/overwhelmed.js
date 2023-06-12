const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("overwhelmed")
        .setDescription("Tell others you are overwhelmed.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell you are overwhelmed.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/b1a9c726-9525-4fe1-b6e4-7ead7e0caeb4/overwhelmed3.gif',
            'https://ucarecdn.com/851092b1-36df-4fb3-829d-e88fafe4474e/overwhelmed.gif',
            'https://ucarecdn.com/70e67dee-e30e-4d5a-9df7-176cfb05b82e/overwhelmed4.gif',
            'https://ucarecdn.com/70c1e2f6-6d9a-4537-b5ab-447e11a1c16f/overwhelmed5.gif',
            'https://ucarecdn.com/9ed2e32a-b8e8-4c42-bf69-fe9ccf22c09c/overwhelmed1.gif',
            'https://ucarecdn.com/8d9ac174-ccb7-4e03-8ac0-6e4b769e53f6/overwhelmed2.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Overwhelmed`, user, Mention, `${member} is overwhelmed ${pingText}!`, image, false)

    }
}