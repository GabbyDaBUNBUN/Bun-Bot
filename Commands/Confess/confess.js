const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const ConfessionDB = require("../../Structures/Schemas/ConfessionDB")
const ConfessionReplyDB = require("../../Structures/Schemas/ConfessionReplyDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("confession")
        .setDescription("Send your confession anonymously.")
        .addSubcommand(sub => sub.setName("confess")
            .setDescription("Send your confession anonymously.")
            .addStringOption(opt => opt.setName("confession").setDescription("What you want to confess.").setRequired(true)))
        .addSubcommand(sub => sub.setName("reply")
            .setDescription("Send a reply to another confession.")
            .addNumberOption(opt => opt.setName("confession").setDescription("Confession number you want to reply to.").setRequired(true))
            .addStringOption(opt => opt.setName("reply").setDescription("Reply you want to send.").setRequired(true))),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild, member } = interaction
        const { emojilist, color } = client

        switch (options.getSubcommand()) {

            case "confess": {

                const confession = options.getString("confession")
                const data = await ConfessionDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There is no confession channel set up yet!`, true)
                const channel = guild.channels.cache.get(data.Channel)
                const count = data.Count
                if (count > 999) {
                    ConfessionReplyDB.deleteMany({ Guild: guild.id })
                    data.Count = 0
                    data.save
                }

                Reply(interaction, emojilist.timer, `Your confession: **${confession}** has been sent!`, true)

                if (!data.LogChannel) {

                    const Message = await channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle(`Confession ${count}`)
                                .setDescription(`${confession}`)
                                .setFooter({ text: "Confessions by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                    ConfessionReplyDB.findOne({ Guild: guild.id, Message: Message.id }, async (err, data) => {
                        if (err) throw err

                        if (!data) {

                            ConfessionReplyDB.create({
                                Guild: guild.id,
                                Channel: Message.channel.id,
                                Message: Message.id,
                                ConfessionNumber: count,
                                Thread: null,
                            })

                        }
                    })

                    data.Count = data.Count + 1
                    await data.save()

                } else {

                    const logChannel = guild.channels.cache.get(data.LogChannel)

                    const Message = await channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle(`Confession #${count}`)
                                .setDescription(`${confession}`)
                                .setFooter({ text: "Confessions by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                    ConfessionReplyDB.findOne({ Guild: guild.id, Message: Message.id }, async (err, data) => {
                        if (err) throw err

                        if (!data) {

                            ConfessionReplyDB.create({
                                Guild: guild.id,
                                Channel: Message.channel.id,
                                Message: Message.id,
                                ConfessionNumber: count,
                                Thread: null,
                            })

                        }
                    })

                    logChannel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Confession Log")
                                .setDescription(`Confession has been sent:`)
                                .setFields(
                                    {
                                        name: `Username:`,
                                        value: `${member.user.username}`,
                                        inline: false,
                                    },
                                    {
                                        name: `User ID:`,
                                        value: `${member.id}`,
                                        inline: false,
                                    },
                                    {
                                        name: `Confession:`,
                                        value: `${confession}`,
                                        inline: false,
                                    },
                                    {
                                        name: `Confession Number:`,
                                        value: `${data.Count}`,
                                        inline: false,
                                    },
                                )
                                .setFooter({ text: "Confessions by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                    data.Count = data.Count + 1
                    await data.save()

                }

            }

                break;

            case "reply": {

                const confession = options.getNumber("confession")
                const reply = options.getString("reply")
                const data = await ConfessionReplyDB.findOne({ Guild: guild.id, ConfessionNumber: confession }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `Could not find that confession! (if the confession #'s started back at 0, then we can't find the confessions before #0)`, true)
                const oldConfessionChannel = guild.channels.cache.get(data.Channel)
                if (!oldConfessionChannel) return Reply(interaction, emojilist.cross, `We cannot find the confession channel!`, true)
                const oldConfessionMessage = oldConfessionChannel.messages.cache.get(data.Message)
                if (!oldConfessionMessage) return Reply(interaction, emojilist.cross, `We cannot find the original confession message!`, true)
                const oldConfessionData = await ConfessionDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `Confessions has not been set up yet!`, true)
                const count = oldConfessionData.Count

                if (!data.Thread) {

                    oldConfessionMessage.startThread({
                        name: `Confession Reply to #${confession}`,
                        autoArchiveDuration: 60,
                        type: ChannelType.GuildText,
                    }).then(async (channel) => {

                        channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle(`Reply #${count}`)
                                    .setDescription(`${reply}`)
                                    .setFooter({ text: "Confessions by Bun Bot" })
                                    .setTimestamp()
                            ]
                        })

                        data.Thread = channel.id
                        await data.save()

                    })

                    const logChannel = guild.channels.cache.get(oldConfessionData.LogChannel)

                    if (logChannel) {

                        logChannel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle("Confession Log")
                                    .setDescription(`Reply has been sent:`)
                                    .setFields(
                                        {
                                            name: `Username:`,
                                            value: `${member.user.username}`,
                                            inline: false,
                                        },
                                        {
                                            name: `User ID:`,
                                            value: `${member.id}`,
                                            inline: false,
                                        },
                                        {
                                            name: `Reply:`,
                                            value: `${reply}`,
                                            inline: false,
                                        },
                                        {
                                            name: `Reply Number:`,
                                            value: `${count}`,
                                            inline: false,
                                        },
                                    )
                                    .setFooter({ text: "Confessions by Bun Bot" })
                                    .setTimestamp()
                            ]
                        })

                    }

                    oldConfessionData.Count = oldConfessionData.Count + 1
                    await oldConfessionData.save()

                    return Reply(interaction, emojilist.tick, `Your reply: **${reply}** has been sent!`, true)

                } else {

                    const channel = guild.channels.cache.get(data.Thread)
                    if (!channel) return Reply(interaction, emojilist.cross, `Could not find that thread of replies!`, true)

                    channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle(`Reply #${count}`)
                                .setDescription(`${reply}`)
                                .setFooter({ text: "Confessions by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                    const logChannel = guild.channels.cache.get(oldConfessionData.LogChannel)

                    if (logChannel) {

                        logChannel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle("Confession Log")
                                    .setDescription(`Reply has been sent:`)
                                    .setFields(
                                        {
                                            name: `Username:`,
                                            value: `${member.user.username}`,
                                            inline: false,
                                        },
                                        {
                                            name: `User ID:`,
                                            value: `${member.id}`,
                                            inline: false,
                                        },
                                        {
                                            name: `Reply:`,
                                            value: `${reply}`,
                                            inline: false,
                                        },
                                        {
                                            name: `Reply Number:`,
                                            value: `${count}`,
                                            inline: false,
                                        },
                                    )
                                    .setFooter({ text: "Confessions by Bun Bot" })
                                    .setTimestamp()
                            ]
                        })

                    }

                    oldConfessionData.Count = oldConfessionData.Count + 1
                    await oldConfessionData.save()

                    return Reply(interaction, emojilist.tick, `Your reply: **${reply}** has been sent!`, true)

                }

            }

                break;

        }

    }
}