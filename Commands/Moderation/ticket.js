const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const TicketChannelDB = require("../../Structures/Schemas/TicketChannel")
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
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the embed sent to. (sends to this channel otherwise)").setRequired(false)))
        .addSubcommand(sub => sub.setName("log-channel")
            .setDescription("Channel you want your ticket logs to be sent to.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel to send logs to.").setRequired(true).addChannelTypes(ChannelType.GuildText))),
    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options, guild, channel } = interaction
        const { emojilist, color } = client

        switch (options.getSubcommand()) {

            case "embed": {

                var Channel = options.getChannel("channel") || channel
                const title = options.getString("title")
                const desc = options.getString("description")


                const Embed = new EmbedBuilder()
                    .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
                    .setColor("0xffc0cb")
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

                break;

            case "log-channel": {

                const Channel = options.getChannel("channel")

                let data = await TicketChannelDB.findOne({ GuildID: guild.id }).catch(err => { })
                if (data) {

                    data.ChannelID = Channel.id

                } else if (!data) {

                    data = new TicketChannelDB({
                        GuildID: guild.id,
                        ChannelID: Channel.id
                    })

                }
                await data.save()

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Ticket Log Channel")
                            .setDescription(`Your channel ${Channel} has been saved!`)
                            .setFooter({ text: "Ticket System by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

        }

    }
}