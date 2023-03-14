const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const ConfessionDB = require("../../Structures/Schemas/ConfessionDB")
const CreateVCDB = require("../../Structures/Schemas/CreateVCDB")
const LevelsChannelDB = require("../../Structures/Schemas/LevelsChannelDB")
const QotdDB = require("../../Structures/Schemas/QotdDB")
const SafeWordDB = require("../../Structures/Schemas/SafeWordDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-up")
        .setDescription("Set up bot features/Command channels.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("confession")
            .setDescription("Set up your confession command needs.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the confessions to be sent in.").setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addChannelOption(opt => opt.setName("log-channel").setDescription("Channel you would like the confession logs to be sent in.").setRequired(true).addChannelTypes(ChannelType.GuildText)))
        .addSubcommand(sub => sub.setName("create-vc")
            .setDescription("Set up your create-vc command needs.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the create vc to be. (MUST BE A VC CHANNEL)").setRequired(true).addChannelTypes(ChannelType.GuildVoice))
            .addStringOption(opt => opt.setName("name").setDescription("What you want your create VC channel to be named.").setRequired(true)))
        .addSubcommand(sub => sub.setName("levels")
            .setDescription("Set up your levels command needs.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the leveling updates to be in.").setRequired(true).addChannelTypes(ChannelType.GuildText)))
        .addSubcommand(sub => sub.setName("qotd")
            .setDescription("Set up your qotd command needs.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the qotd to be sent in.").setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addRoleOption(opt => opt.setName("role").setDescription("Role you want pinged when qotd is sent.").setRequired(true)))
        .addSubcommand(sub => sub.setName("safe-word")
            .setDescription("Set up your safe-word command needs.")
            .addStringOption(opt => opt.setName("safeword").setDescription("The word you want to use for the safeword.").setRequired(true))
            .addRoleOption(opt => opt.setName("role").setDescription("Role you want pinged when the safe word is used.").setRequired(true))),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options, guild } = interaction
        const { emojilist } = client

        switch (options.getSubcommand()) {

            case "confession": {

                const channel = options.getChannel("channel")
                const logChannel = options.getChannel("log-channel")

                let data = await ConfessionDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    if (logChannel) {

                        data.Channel = channel.id
                        data.LogChannel = logChannel.id
                        data.save

                    } else {

                        data.Channel = channel.id
                        data.save

                    }

                } else if (!data) {

                    if (logChannel) {

                        data = new ConfessionDB({
                            Guild: guild.id,
                            Channel: channel.id,
                            LogChannel: logChannel.id,
                            Count: 0,
                        })

                        await data.save()

                    } else {

                        data = new ConfessionDB({
                            Guild: guild.id,
                            Channel: channel.id,
                            Count: 0,
                        })

                        await data.save()

                    }

                }

                Reply(interaction, emojilist.tick, `Your confession setup info has been saved!`)

            }

                break;

            case "create-vc": {

                const channel = options.getChannel("channel")
                const name = options.getString("name")

                let data = await CreateVCDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.Channel = channel.id
                    data.ChannelName = name
                    data.save

                } else if (!data) {

                    data = new CreateVCDB({
                        Guild: guild.id,
                        Channel: channel.id,
                        ChannelName: name,
                    })

                    await data.save()

                }

                channel.setName(data.ChannelName)

                Reply(interaction, emojilist.tick, `Your create a vc setup info has been saved!`)

            }

                break;

            case "levels": {

                const channel = options.getChannel("channel")

                let data = await LevelsChannelDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.Channel = channel.id
                    data.save

                } else if (!data) {

                    data = new LevelsChannelDB({
                        Guild: guild.id,
                        Channel: channel.id,
                    })

                    await data.save()

                }

                Reply(interaction, emojilist.tick, `Your levels setup info has been saved!`)

            }

                break;

            case "qotd": {

                const channel = options.getChannel("channel")
                const role = options.getRole("role")

                let data = await QotdDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.Channel = channel.id
                    data.Role = role
                    data.save

                } else if (!data) {

                    data = new QotdDB({
                        Guild: guild.id,
                        Channel: channel.id,
                        Role: role,
                        Count: 0,
                    })

                    await data.save()

                }

                Reply(interaction, emojilist.tick, `Your qotd setup info has been saved!`)

            }

                break;

            case "safe-word": {

                const safeword = options.getString("safeword")
                const role = options.getRole("role")

                let data = await SafeWordDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.SafeWord = safeword
                    data.Role = role
                    data.save

                } else if (!data) {

                    data = new SafeWordDB({
                        Guild: guild.id,
                        Role: role,
                        SafeWord: safeword,
                    })

                    await data.save()

                }

                Reply(interaction, emojilist.tick, `Your safe word setup info has been saved!`)

            }

                break;

        }

    }
}