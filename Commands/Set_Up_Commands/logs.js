const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const WarnChannelDB = require("../../Structures/Schemas/WarnChannelDB")
const KickChannelDB = require("../../Structures/Schemas/KickChannelDB")
const BanChannelDB = require("../../Structures/Schemas/BanChannelDB")
const TicketChannelDB = require("../../Structures/Schemas/TicketChannel")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("log-channel")
        .setDescription("Log Channels.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("warn")
            .setDescription("Channel where you want the warn logs sent.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the warn logs sent to.").setRequired(true)))
        .addSubcommand(sub => sub.setName("kick")
            .setDescription("Channel where you want the kick logs sent.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the kick logs sent to.").setRequired(true)))
        .addSubcommand(sub => sub.setName("ban")
            .setDescription("Channel where you want the ban logs sent.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the ban logs sent to.").setRequired(true)))
        .addSubcommand(sub => sub.setName("ticket")
            .setDescription("Channel you want your ticket logs to be sent to.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel to send logs to.").setRequired(true))),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { guild, member, options } = interaction
        const { color, emojilist } = client

        switch (options.getSubcommand()) {

            case "warn": {

                const channel = options.getChannel("channel")

                let data = await WarnChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.Channel = channel.id

                } else if (!data) {

                    data = new WarnChannelDB({
                        Guild: guild.id,
                        Channel: channel.id,
                    })

                }
                await data.save()

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Warn Log Channel")
                            .setDescription(`Your warn log channel ${channel} has been saved!`)
                            .setFooter({ text: "Warn by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "kick": {

                const channel = options.getChannel("channel")

                let data = await KickChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.Channel = channel.id

                } else if (!data) {

                    data = new KickChannelDB({
                        Guild: guild.id,
                        Channel: channel.id,
                    })

                }
                await data.save()

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Kick Log Channel")
                            .setDescription(`Your kick log channel ${channel} has been saved!`)
                            .setFooter({ text: "Kick by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "ban": {

                const channel = options.getChannel("channel")

                let data = await BanChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.Channel = channel.id

                } else if (!data) {

                    data = new BanChannelDB({
                        Guild: guild.id,
                        Channel: channel.id,
                    })

                }
                await data.save()

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Ban Log Channel")
                            .setDescription(`Your ban log channel ${channel} has been saved!`)
                            .setFooter({ text: "Ban by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "ticket": {

                const Channel = options.getChannel("channel")

                let data = await TicketChannelDB.findOne({ GuildID: guild.id }).catch(err => { })
                if (data) {

                    data.ChannelID = Channel.id

                } else if (!data) {

                    data = new TicketChannelDB({
                        GuildID: guild.id,
                        ChannelID: Channel.id,
                        ChannelType: [],
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