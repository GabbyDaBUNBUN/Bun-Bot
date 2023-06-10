const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("movie-poll")
        .setDescription("Create a movie poll.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(opt => opt.setName("movie1").setDescription("Movie 1.").setRequired(true))
        .addStringOption(opt => opt.setName("movie2").setDescription("Movie 2.").setRequired(true))
        .addStringOption(opt => opt.setName("movie3").setDescription("Movie 3.").setRequired(true))
        .addStringOption(opt => opt.setName("movie4").setDescription("Movie 4.").setRequired(true)),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options } = interaction
        const { color } = client

        const movie1 = options.getString("movie1")
        const movie2 = options.getString("movie2")
        const movie3 = options.getString("movie3")
        const movie4 = options.getString("movie4")

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Movie Poll")
            .setDescription(`Please vote on the movie you want to watch:\n\nMovie 1:${movie1}\nMovie 2:${movie2}\nMovie 3:${movie3}\nMovie 4:${movie4}`)
            .addFields(
                {
                    name: `Movie 1`,
                    value: `0`,
                    inline: true,
                },
                {
                    name: `Movie 2`,
                    value: `0`,
                    inline: true,
                },
                {
                    name: `Movie 3`,
                    value: `0`,
                    inline: true,
                },
                {
                    name: `Movie 4`,
                    value: `0`,
                    inline: true,
                },
            )
            .setFooter({ text: "Movie Poll by Bun Bot" })
            .setTimestamp()

        const replyObject = await interaction.reply({ embeds: [ Embed ], fetchReply: true })

        const Buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Movie 1`)
                    .setEmoji(`✅`)
                    .setCustomId(`MoviePoll-Movie1-${replyObject.id}`)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel(`Movie 2`)
                    .setEmoji(`✅`)
                    .setCustomId(`MoviePoll-Movie2-${replyObject.id}`)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel(`Movie 3`)
                    .setEmoji(`✅`)
                    .setCustomId(`MoviePoll-Movie3-${replyObject.id}`)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel(`Movie 4`)
                    .setEmoji(`✅`)
                    .setCustomId(`MoviePoll-Movie4-${replyObject.id}`)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel(`End Poll`)
                    .setEmoji(`🛑`)
                    .setCustomId(`MoviePoll-End-${replyObject.id}`)
                    .setStyle(ButtonStyle.Danger),
            )

        interaction.editReply({ components: [ Buttons ] })

    }
}