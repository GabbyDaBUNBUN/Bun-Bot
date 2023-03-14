const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a poll.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(opt => opt.setName("question").setDescription("Question of the poll.").setRequired(true)),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options } = interaction
        const { color } = client

        const question = options.getString("question")

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Poll")
            .setDescription(`Please respond to the poll:\n\n${question}`)
            .addFields(
                {
                    name: `Yes's`,
                    value: `0`,
                    inline: true,
                },
                {
                    name: `No's`,
                    value: `0`,
                    inline: true,
                },
            )
            .setFooter({ text: "Poll by Bun Bot" })
            .setTimestamp()

        const replyObject = await interaction.reply({ embeds: [ Embed ], fetchReply: true })

        const Buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Yes`)
                    .setEmoji(`✅`)
                    .setCustomId(`Poll-Yes-${replyObject.id}`)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel(`End Poll`)
                    .setEmoji(`🛑`)
                    .setCustomId(`Poll-End-${replyObject.id}`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setLabel(`No`)
                    .setEmoji(`❌`)
                    .setCustomId(`Poll-No-${replyObject.id}`)
                    .setStyle(ButtonStyle.Danger)
            )

        interaction.editReply({ components: [ Buttons ] })

    }
}