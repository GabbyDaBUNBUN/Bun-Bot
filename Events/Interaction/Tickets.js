const { Events, MessageComponentInteraction, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType, AttachmentBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const { createTranscript } = require("discord-html-transcripts")
const TicketDB = require("../../Structures/Schemas/TicketDB")
const TicketChannelDB = require("../../Structures/Schemas/TicketChannel")
const Reply = require("../../Systems/Reply")
const { data } = require("../../Commands/Information/help")

module.exports = {
    name: Events.InteractionCreate,

    /**
     * @param { MessageComponentInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        if (!interaction.isButton()) return

        const { guild, member, customId, channel, user, message, type } = interaction
        const { emojilist, color } = client

        if (![ "open", "close-delete", "delete" ].includes(customId)) return



        switch (customId) {

            case "open": {

                const ID = Math.floor(Math.random() * 90000) + 10000
                const everyone = guild.roles.cache.get(guild.roles.everyone.id)

                await guild.channels.create({
                    name: `${customId} + "-" + ${ID}`,
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
                        .setColor("0xffc0cb")
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

                let data = await TicketChannelDB.findOne({ GuildID: guild.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `You don't have ticket logs set up yet! You can do so by using \`/ticket log-channel\`!`)

                let ticketData = await TicketDB.findOne({ GuildID: guild.id, ChannelID: channel.id }).catch(err => { })

                const Channel = guild.channels.cache.get(data.ChannelID)
                const attachement = await createTranscript(channel, {
                    limit: -1,
                    returnType: `attachment`,
                    filename: `${ticketData.TicketID} - ${ticketData.MemberID}.html`,
                })
                Channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle(`Ticket: ${ticketData.TicketID}`)
                            .setTimestamp()
                    ],
                    files: [ attachement ]
                })

                await TicketDB.findOneAndDelete({ ChannelID: channel.id })

                channel.delete()

            }

                break;

        }

    }
}