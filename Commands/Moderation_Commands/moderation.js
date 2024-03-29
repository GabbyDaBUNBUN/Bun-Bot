const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const WarnChannelDB = require("../../Structures/Schemas/WarnChannelDB")
const WarnDB = require("../../Structures/Schemas/WarnDB")
const KickChannelDB = require("../../Structures/Schemas/KickChannelDB")
const BanChannelDB = require("../../Structures/Schemas/BanChannelDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("moderation")
        .setDescription("Warn Commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("warn-member")
            .setDescription("Warn a member.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to warn.").setRequired(true))
            .addStringOption(opt => opt.setName("reason").setDescription("Reason for warning.").setRequired(true)))
        .addSubcommand(sub => sub.setName("warn-info")
            .setDescription("Get Warn info on a user")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to find warn info for.").setRequired(true)))
        .addSubcommand(sub => sub.setName("kick-member")
            .setDescription("Kick a member.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to kick.").setRequired(true))
            .addStringOption(opt => opt.setName("reason").setDescription("Reason for kick.").setRequired(true)))
        .addSubcommand(sub => sub.setName("ban-member")
            .setDescription("Ban a member.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to ban.").setRequired(true))
            .addStringOption(opt => opt.setName("reason").setDescription("Reason for ban.").setRequired(true))),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { guild, member, options } = interaction
        const { color, emojilist } = client

        switch (options.getSubcommand()) {

            case "warn-member": {

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

            case "warn-info": {

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

            case "kick-member": {

                const user = options.getUser("user")
                const reason = options.getString("reason") || `No reason provided`
                const findUser = guild.members.cache.get(user.id)
                const findMember = guild.members.cache.get(member.id)

                const kickChannel = await KickChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!kickChannel) return Reply(interaction, emojilist.cross, `There is no kick log channel yet! Create one by using \`/kick log-channel\`!`, true)
                const findKickChannel = guild.channels.cache.get(kickChannel.Channel)

                if (findMember.roles.highest.position <= findUser.roles.highest.position) return Reply(interaction, emojilist.cross, `You cannot kick someone that is the same level as you or higher!`, true)

                findKickChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Kicked!")
                            .setDescription(`${user} has been kicked by ${member} for \`${reason}\``)
                            .setFooter({ text: "Kick by Bun Bot" })
                            .setTimestamp()
                    ],
                })

                findUser.kick({ reason: reason })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Kicked!")
                            .setDescription(`${user} has been kicked.`)
                            .setFooter({ text: "Kick by Bun Bot" })
                            .setTimestamp()
                    ],
                    ephemeral: true,
                })

            }

                break;

            case "ban-member": {

                const user = options.getUser("user")
                const reason = options.getString("reason") || `No reason provided`
                const findUser = guild.members.cache.get(user.id)
                const findMember = guild.members.cache.get(member.id)

                const banChannel = await BanChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!banChannel) return Reply(interaction, emojilist.cross, `There is no ban log channel yet! Create one by using \`/ban log-channel\`!`, true)
                const findBanChannel = guild.channels.cache.get(banChannel.Channel)

                if (findMember.roles.highest.position <= findUser.roles.highest.position) return Reply(interaction, emojilist.cross, `You cannot ban someone that is the same level as you or higher!`, true)

                findBanChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Banned!")
                            .setDescription(`${user} has been Banned by ${member} for \`${reason}\``)
                            .setFooter({ text: "Ban by Bun Bot" })
                            .setTimestamp()
                    ],
                })

                findUser.ban({ reason: reason, deleteMessageSeconds: 7 * 24 * 60 * 60 })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Banned!")
                            .setDescription(`${user} has been Banned.`)
                            .setFooter({ text: "Ban by Bun Bot" })
                            .setTimestamp()
                    ],
                    ephemeral: true,
                })

            }

                break;

        }

    }
}