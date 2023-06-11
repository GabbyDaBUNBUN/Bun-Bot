const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hydrate")
        .setDescription("Tell somone to hydrate.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to remind to stay hydrated.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/1c91b080-e7a2-477b-8a2b-d90f2581459b/hydrate.gif',
            'https://ucarecdn.com/e5eb83c4-71a0-474d-8416-5a2d84a7975a/hydrate5.gif',
            'https://ucarecdn.com/0896084e-d69b-43a7-8ce8-a032948a19c8/hydrate2.gif',
            'https://ucarecdn.com/018d01b3-d59a-48ca-97c2-bf820a278f85/hydrate4.gif',
            'https://ucarecdn.com/499fdfe2-3dae-45ef-ab7c-eb28f0b777a5/hydrate1.gif',
            'https://ucarecdn.com/1a3aa77d-2cae-4aee-a754-2bed4a50d7c1/hydrate3.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Hydrate`, user, Mention, `${member} says don't forget to drink some water ${pingText}!`, image, false)

    }
}