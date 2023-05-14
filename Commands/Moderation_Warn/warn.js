const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const WarnChannelDB = require("../../Structures/Schemas/WarnChannelDB")
const WarnDB = require("../../Structures/Schemas/WarnDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn Commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("log-channel")
            .setDescription("Channel where you want the warn logs sent.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the warn logs sent to.").setRequired(true)))
        .addSubcommand(sub => sub.setName("member")
            .setDescription("Warn a member.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to warn.").setRequired(true))
            .addStringOption(opt => opt.setName("reason").setDescription("Reason for warning.").setRequired(false)))
        .addSubcommand(sub => sub.setName("info")
            .setDescription("Get Warn info on a user")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to find warn info for.").setRequired(true))),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { guild, member, options } = interaction
        const { color, emojilist } = client

        switch (options.getSubcommand()) {

            case "log-channel": {

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

            case "member": {

                const user = options.getUser("user")
                const reason = options.getString("reason") || `No reason provided`
                const findUser = guild.members.cache.get(user.id)
                const findMember = guild.members.cache.get(member.id)

                const warnChannel = await WarnChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!warnChannel) return Reply(interaction, emojilist.cross, `There is no warn log channel yet! Create one by using \`/warn log-channel\`!`, true)
                const findWarnChannel = guild.channels.cache.get(warnChannel.Channel)

                if (findMember.roles.highest.position <= findUser.roles.highest.position) return Reply(interaction, emojilist.cross, `You cannot warn someone that is the same level as you or higher!`, true)

                let data = await WarnDB.findOne({ Guild: guild.id, Member: user.id }).catch(err => { })
                if (data) {
                    data.WarnAmount = data.WarnAmount + 1
                } else if (!data) {
                    data = new WarnDB({
                        Guild: guild.id,
                        Member: user.id,
                        WarnAmount: 1,
                    })
                }
                await data.save()

                findWarnChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Warning!")
                            .setDescription(`${user} has been warned by ${member} for \`${reason}\`. This is their ${data.WarnAmount} warning.`)
                            .setFooter({ text: "Warn by Bun Bot" })
                            .setTimestamp()
                    ],
                })

                if (data.WarnAmount === 4) {
                    findUser.ban({ reason: reason, deleteMessageSeconds: 7 * 24 * 60 * 60 })

                    findWarnChannel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Banned!")
                                .setDescription(`${user} has been warned for the 4th time and has been banned from the server.`)
                                .setFooter({ text: "Warn by Bun Bot" })
                                .setTimestamp()
                        ],
                        ephemeral: false,
                    })

                    return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Banned!")
                                .setDescription(`${user} has been warned for the 4th time and has been banned from the server.`)
                                .setFooter({ text: "Warn by Bun Bot" })
                                .setTimestamp()
                        ],
                        ephemeral: true,
                    })
                } else {

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Warned!")
                                .setDescription(`${user} has been warned.`)
                                .setFooter({ text: "Warn by Bun Bot" })
                                .setTimestamp()
                        ],
                        ephemeral: true,
                    })

                }

            }

                break;

            case "info": {

                const user = options.getUser("user")

                let data = await WarnDB.findOne({ Guild: guild.id, Member: user.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There is no warn data for this user!`)

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Warn Info")
                            .setDescription(`User: <@${data.Member}>\nWarns: ${data.WarnAmount}`)
                            .setFooter({ text: "Warn by Bun Bot" })
                            .setTimestamp()
                    ],
                    ephemeral: true
                })

            }

                break;

        }

    }
}