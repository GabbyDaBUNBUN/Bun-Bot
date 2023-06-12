const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Roleplay = require("../../Systems/Roleplay")

count = 0

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pat")
        .setDescription("Pat someone.")
        .addUserOption(opt => opt.setName("user").setDescription("The user you want to pat.").setRequired(false))
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

        const gifs = [ 'https://ucarecdn.com/0cc1593d-d9c4-4b22-9bdd-97a42c532c41/pat.gif',
            'https://ucarecdn.com/32817883-b68e-41b8-b01c-12f9bf54007a/pat4.gif',
            'https://ucarecdn.com/a21831a3-d7da-4db7-b600-432e40eed8bc/pat3.gif',
            'https://ucarecdn.com/67e4378a-fb14-48fa-8521-48989843cd5b/pat5.gif',
            'https://ucarecdn.com/611130de-159e-403a-b1fb-cef7328dfc80/pat1.gif',
            'https://ucarecdn.com/3345e846-32b4-4dd8-b0e8-5e04a6e8d6db/pat2.gif' ]

        if (count >= gifs.length) count = 0

        const image = gifs[ count ]

        count++
        return Roleplay(interaction, `Pat`, user, Mention, `${member} pats ${pingText}!`, image, false)

    }
}