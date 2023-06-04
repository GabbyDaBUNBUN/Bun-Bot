const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("good-morning")
        .setDescription("Say good morning.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell good morning.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/6f049df6-89db-4f17-8a0c-47b3414704ab/goodmorning2.gif',
            'https://ucarecdn.com/94ea669c-f4f3-4f21-a40e-1667828ccc7b/goodmorning5.gif',
            'https://ucarecdn.com/85eeed53-06ab-4d51-aba1-829edf84fc2a/goodmorning1.gif',
            'https://ucarecdn.com/cc8fa9c0-e969-4d4f-b633-e36ce973c8ac/goodmorning4.gif',
            'https://ucarecdn.com/726b77fd-674e-418a-8c83-2e8784dbb275/goodmorning3.gif',
            'https://ucarecdn.com/fe77154c-789c-486c-ae07-7272aae1354e/goodmorning.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Good Morning`, user, Mention, `${member} says good morning! ${pingText}!`, image, false)

    }
}