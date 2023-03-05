const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Sends a list of the bot commands."),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { channel } = interaction
        const { color } = client

        const CreateVC = [ `create-vc name\ncreate-vc private\ncreate-vc invite` ]
        const Games = [ `rank\nleader-board\nhighscore` ]
        const Information = [ `help\nping` ]
        const Moderation = [ '\nclear\ncounting-save\ncounting-setup\ncreate-vc-setup\nembed create\nembed send\nembed list\nembed delete\nlevels-setup\nqotd-setup\nreaction-roles add-role\nreaction-roles remove-role\nreaction-roles panel\nsafe-word-setup\nticket' ]
        const Music = [ `play\npause\nresume\nstop\nskip\nrepeat-loop\nqueue\nleave` ]
        const Roleplay = [ `bite\nblow-kiss\nblush\nboop\nbrat\ncatch\ncry\ncuddle\ndance\nfeed\nflop\ngiggle\ngood-morning\nheal\nhide\nhug\nhydrate\nlaugh\nnini\nnope\noverwhelmed\npat\npet\npick-up\nplease\npoke\npout\nrun\nshy\nsip\nsleepy\nsmile\nsorry\nthank\ntickle\nup\nwag\nwake-up` ]

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Help")
            .setDescription("List of all the commands available at this time:")
            .setFields(
                {
                    name: "Create VC:",
                    value: `${CreateVC}`,
                    inline: true,
                },
                {
                    name: "Game:",
                    value: `${Games}`,
                    inline: true,
                },
                {
                    name: "Information:",
                    value: `${Information}`,
                    inline: true,
                },
                {
                    name: "Moderation:",
                    value: `${Moderation}`,
                    inline: true,
                },
                {
                    name: "Music",
                    value: `${Music}`,
                    inline: true,
                },
                {
                    name: "Roleplay",
                    value: `${Roleplay}`,
                    inline: true,
                },
            )
            .setFooter({ text: "/help by Bun Bot" })
            .setTimestamp()

        channel.send({ embeds: [ Embed ] })

    }
}