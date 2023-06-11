const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("nini")
        .setDescription("Say good night.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to tell good night.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/11651f47-b5fc-425e-b5ad-54a58dda21de/nini1.gif',
            'https://ucarecdn.com/694b894d-fe7f-4c7a-8701-414b1f16dfd6/nini2.gif',
            'https://ucarecdn.com/30385759-e114-40d4-891d-da9708a2ba20/nini5.gif',
            'https://ucarecdn.com/9579b80a-80eb-4ea9-8574-63f8fff2db2a/nini4.gif',
            'https://ucarecdn.com/96c5b9e5-7c69-4579-a513-934e0dae080d/nini3.gif',
            'https://ucarecdn.com/fd411297-7077-4582-977b-c520828521d1/nini.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Nini (Good Night)`, user, Mention, `${member} says good night ${pingText}!`, image, false)

    }
}