const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flop")
        .setDescription("Do a flop.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to show you are flopping.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/2a947636-d8ca-4a68-94bd-5f2ce8216537/flop.gif',
            'https://ucarecdn.com/4b8d598a-1b00-495a-b37b-6c1e5234b279/flop2.gif',
            'https://ucarecdn.com/a40d231c-2285-4a88-b741-3d76a3f2fab1/flop3.gif',
            'https://ucarecdn.com/b5a3d857-86c1-4d54-a732-1d3c040a881c/flop4.gif',
            'https://ucarecdn.com/efc16bee-f786-443d-a300-1447bac6fc1f/flop1.gif',
            'https://ucarecdn.com/05f6bae9-3161-466a-95c6-e791ebf0fcc7/flop5.gif', ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Flop`, user, Mention, `${member} flops ${pingText}!`, image, false)

    }
}