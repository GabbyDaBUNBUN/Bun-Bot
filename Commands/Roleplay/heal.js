const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("heal")
        .setDescription("Heal someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to heal.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/62fcf738-67ca-40ee-8b5e-49cb1f52d12c/heal.gif',
            'https://ucarecdn.com/6f4d1ee2-4ded-4d67-9e7f-f6fc1fccc924/heal5.gif',
            'https://ucarecdn.com/140211a4-c36f-4da2-90b6-1c762f169ba0/heal3.gif',
            'https://ucarecdn.com/97205442-3376-454b-b7f3-5bc25a43be00/heal4.gif',
            'https://ucarecdn.com/4891e06a-5bbe-48a8-add3-75ae560eadc0/heal1.gif',
            'https://ucarecdn.com/65d47595-2afa-470c-8c0d-73fea6d548df/heal2.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Heal`, user, Mention, `${member} heals ${pingText}!`, image, false)

    }
}