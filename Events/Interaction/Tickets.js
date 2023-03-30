const { Events, MessageComponentInteraction, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType, AttachmentBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const { createTranscript } = require("discord-html-transcripts")
const TicketDB = require("../../Structures/Schemas/TicketDB")
const TicketChannelDB = require("../../Structures/Schemas/TicketChannel")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: Events.InteractionCreate,

    /**
     * @param { MessageComponentInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        if (!interaction.isButton()) return

        const { guild, member, customId, channel, user, message } = interaction
        const { emojilist, color } = client

        if (![ "open", "close-delete", "delete" ].includes(customId)) return

        let channelData = await TicketChannelDB.findOne({ GuildID: guild.id }).catch(err => { })
        if (!channelData) return Reply(interaction, emojilist.cross, `You don't have ticket logs set up yet! You can do so by using \`/ticket log-channel\`!`)

        switch (customId) {

            case "open": {

                const ID = Math.floor(Math.random() * 90000) + 10000
                const everyone = guild.roles.cache.get(guild.roles.everyone.id)

                const data = await TicketDB.findOne({ GuildID: guild.id, MemberID: user.id }).catch(err => { })
                if (data) return Reply(interaction, emojilist.cross, `You already have an open ticket: <#${data.ChannelID}>!`, true)

                await guild.channels.create({
                    name: `${message.embeds[ 0 ].title} ${ID}`,
                    type: ChannelType.GuildText,
                    parent: channel.parentId,
                    permissionOverwrites: [
                        {
                            id: member.id,
                            allow: [ "SendMessages", "ViewChannel", "ReadMessageHistory" ]
                        },
                        {
                            id: everyone,
                            deny: [ "SendMessages", "ViewChannel", "ReadMessageHistory" ]
                        },
                    ],
                }).then(async (channel) => {

                    await TicketDB.create({
                        GuildID: guild.id,
                        MemberID: member.id,
                        TicketID: ID,
                        ChannelID: channel.id,
                        Type: customId,
                    })

                    const Embed = new EmbedBuilder()
                        .setAuthor({ name: `${guild.name} | Ticket #${ID}`, iconURL: guild.iconURL({ dynamic: true }) })
                        .setColor(color)
                        .setTitle(`Ticket #${ID}`)
                        .setDescription(`Please wait patiently for someone to come and assist you. While you are waiting, please describe your issue in as much detail as possible.`)
                        .setFooter({ text: "Ticket System by Bun Bot" })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("close-delete")
                            .setLabel("Close & Delete")
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji("⚠️"),
                    )

                    channel.send({ content: `${member} here is your ticket:`, embeds: [ Embed ], components: [ Buttons ] })

                    return Reply(interaction, emojilist.tick, `${member} your ticket has been created: ${channel}`, true)
                })

            }

                break;

            case "close-delete": {

                if (!member.permissions.has("Administrator")) return Reply(interaction, emojilist.cross, "You do not have permission to use this button!", true)

                const Embed = new EmbedBuilder()
                    .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
                    .setTitle("⚠️ | Close & Delete")
                    .setDescription("Are you sure you want to close and delete the ticket?")
                    .setFooter({ text: "Ticket System by Bun Bot" })
                    .setTimestamp()

                const Buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("delete")
                        .setLabel("Delete")
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji("⚠️"),
                )

                message.delete()
                channel.send({ embeds: [ Embed ], components: [ Buttons ] })

            }

                break;

            case "delete": {

                if (!member.permissions.has("Administrator")) return Reply(interaction, emojilist.cross, "You do not have permission to use this button!", true)

                let ticketData = await TicketDB.findOne({ GuildID: guild.id, ChannelID: channel.id }).catch(err => { })

                const Channel = guild.channels.cache.get(channelData.ChannelID)
                const attachement = await createTranscript(channel, {
                    limit: -1,
                    returnType: `attachment`,
                    filename: `${ticketData.TicketID} - ${ticketData.MemberID}.html`,
                })
                const sentTranscript = await Channel.send({
                    files: [ attachement ]
                })
                const Message = Channel.messages.cache.get(sentTranscript.id)
                Channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle(`Closed Ticket`)
                            .setDescription(`**Ticket Details:**\n\n\`\`\`Member ID: ${ticketData.MemberID}\nTicket ID: ${ticketData.TicketID}\nChannel ID: ${ticketData.ChannelID}\`\`\``)
                            .setFields(
                                {
                                    name: `Ticket Link:`,
                                    value: `${Message.attachments.first().url}`,
                                    inline: true
                                }
                            )
                            .setFooter({ text: "Tickets by Bun Bot" })
                            .setTimestamp()
                    ],
                })

                await TicketDB.findOneAndDelete({ ChannelID: channel.id })

                channel.delete()

            }

                break;

        }

    }
}