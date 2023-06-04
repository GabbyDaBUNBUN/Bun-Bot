const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("brat")
        .setDescription("Throw a tantrum.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are throwing a tantrum.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/91b10258-0540-4224-8547-3d257278147c/brat.gif',
            'https://ucarecdn.com/7acae7a2-467b-437a-8b28-7874d740dd94/brat1.gif',
            'https://ucarecdn.com/c3c5ee6b-3fa5-4ac0-86ad-6d3075bc00ea/brat4.gif',
            'https://ucarecdn.com/9b42ad21-fc00-4029-9b96-138cf32a9ab3/brat3.gif',
            'https://ucarecdn.com/a81dbcff-e642-46e3-91fe-8b4f0c494b3e/brat5.gif',
            'https://ucarecdn.com/5a539ea3-6f3c-4775-9d5c-df40c8f2f49d/brat6.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Brat`, user, Mention, `${member} brats ${pingText}!`, image, false)

    }
}