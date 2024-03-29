const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll")
        .setDescription("Create a poll.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(opt => opt.setName("question").setDescription("Poll question.").setRequired(true))
        .addStringOption(opt => opt.setName("option1").setDescription("Option 1.").setRequired(true))
        .addStringOption(opt => opt.setName("option2").setDescription("Option 2.").setRequired(true))
        .addStringOption(opt => opt.setName("option3").setDescription("Option 3.").setRequired(false))
        .addStringOption(opt => opt.setName("option4").setDescription("Option 4.").setRequired(false)),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options } = interaction
        const { color } = client

        const question = options.getString("question")
        const option1 = options.getString("option1")
        const option2 = options.getString("option2")
        const option3 = options.getString("option3")
        const option4 = options.getString("option4")

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Poll:")
            .setDescription(`**${question}**`)
            .addFields(
                {
                    name: `${option1}`,
                    value: `0`,
                    inline: true,
                },
                {
                    name: `${option2}`,
                    value: `0`,
                    inline: true,
                },
                {
                    name: `${option3}`,
                    value: `0`,
                    inline: true,
                },
                {
                    name: `${option4}`,
                    value: `0`,
                    inline: true,
                },
            )
            .setFooter({ text: "Poll by Bun Bot" })
            .setTimestamp()

        const replyObject = await interaction.reply({ embeds: [ Embed ], fetchReply: true })

        if (!option3 && !option4) {

            const Buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`${option1}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option1-${option1}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option2}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option2-${option2}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option3}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option3-${option3}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setLabel(`${option4}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option4-${option4}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setLabel(`End Poll`)
                        .setEmoji(`🛑`)
                        .setCustomId(`Poll-End-${replyObject.id}`)
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
                )

            interaction.editReply({ components: [ Buttons ] })

        } else if (option3 && !option4) {

            const Buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`${option1}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option1-${option1}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option2}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option2-${option2}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option3}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option3-${option3}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option4}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option4-${option4}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setLabel(`End Poll`)
                        .setEmoji(`🛑`)
                        .setCustomId(`Poll-End-${replyObject.id}`)
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
                )

            interaction.editReply({ components: [ Buttons ] })

        } else if (!option3 && option4) {

            const Buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`${option1}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option1-${option1}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option2}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option2-${option2}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option3}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option3-${option3}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setLabel(`${option4}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option4-${option4}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`End Poll`)
                        .setEmoji(`🛑`)
                        .setCustomId(`Poll-End-${replyObject.id}`)
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
                )

            interaction.editReply({ components: [ Buttons ] })

        } else if (option3 && option4) {

            const Buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(`${option1}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option1-${option1}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option2}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option2-${option2}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option3}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option3-${option3}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`${option4}`)
                        .setEmoji(`✅`)
                        .setCustomId(`Poll-Option4-${option4}-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false),
                    new ButtonBuilder()
                        .setLabel(`End Poll`)
                        .setEmoji(`🛑`)
                        .setCustomId(`Poll-End-${replyObject.id}`)
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
                )

            interaction.editReply({ components: [ Buttons ] })

        }

    }
}