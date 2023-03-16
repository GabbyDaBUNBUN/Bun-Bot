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

        const { color } = client

        const Confess = [ `confess\nreply` ]
        const CreateVC = [ `create-vc name\ncreate-vc private\ncreate-vc invite` ]
        const Currency = [ `coins balance\ncoins snuggle\ncoins pet\ncoins give-bal\npick\nshop view\nshop buy\nshop use` ]
        const Games = [ `rank\nleader-board\nhighscore` ]
        const Information = [ `help\nping` ]
        const Music = [ `play\npause\nresume\nstop\nskip\nrepeat-loop\nqueue\nleave\nvolume` ]
        const Roleplay = [ `bite\nblow-kiss\nblush\nboop\nbrat\ncatch\ncry\ncuddle\ndance\nfeed\nflop\ngiggle\ngood-morning\nheal\nhide\nhug\nhydrate\nlaugh\nnini\nnope\noverwhelmed\npat\npet\npick-up\nplease\npoke\npout\nrun\nshy\nsip\nsleepy\nsmile\nsorry\nthank\ntickle\nup\nwag\nwake-up` ]

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Help")
            .setDescription("List of all the commands available at this time:")
            .setFields(
                {
                    name: "Confession:",
                    value: `${Confess}`,
                    inline: true,
                },
                {
                    name: "Create VC:",
                    value: `${CreateVC}`,
                    inline: true,
                },
                {
                    name: "Currency:",
                    value: `${Currency}`,
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

        interaction.reply({ embeds: [ Embed ] })

    }
}