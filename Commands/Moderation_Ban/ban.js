const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const BanChannelDB = require("../../Structures/Schemas/BanChannelDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban Commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("log-channel")
            .setDescription("Channel where you want the ban logs sent.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the ban logs sent to.").setRequired(true)))
        .addSubcommand(sub => sub.setName("member")
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

            case "log-channel": {

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

            case "member": {

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