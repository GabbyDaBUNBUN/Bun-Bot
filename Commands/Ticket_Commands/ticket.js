const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Ticket commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("embed")
            .setDescription("The embed used to create tickets.")
            .addStringOption(opt => opt.setName("title").setDescription("The title of the embed.").setRequired(true))
            .addStringOption(opt => opt.setName("description").setDescription("The description of the embed.").setRequired(true))
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the embed sent to. (sends to this channel otherwise)").setRequired(false))),
    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options, guild, channel } = interaction
        const { emojilist, color } = client

        var Channel = options.getChannel("channel") || channel
        const title = options.getString("title")
        const desc = options.getString("description")

        const Embed = new EmbedBuilder()
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
            .setColor(color)
            .setTitle(`${title}`)
            .setDescription(`${desc}`)
            .setFooter({ text: "Ticket System by Bun Bot" })
            .setTimestamp()

        const Buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("open")
                .setLabel("Open Ticket")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("🎟️")
        );

        Channel.send({ embeds: [ Embed ], components: [ Buttons ] })

        return Reply(interaction, emojilist.tick, "Your ticket system has been set up!", true)

    }
}
