const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const KickChannelDB = require("../../Structures/Schemas/KickChannelDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick Commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("log-channel")
            .setDescription("Channel where you want the kick logs sent.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the kick logs sent to.").setRequired(true)))
        .addSubcommand(sub => sub.setName("member")
            .setDescription("Kick a member.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to kick.").setRequired(true))
            .addStringOption(opt => opt.setName("reason").setDescription("Reason for kick.").setRequired(false))),

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

            case "member": {

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

        }

    }
}