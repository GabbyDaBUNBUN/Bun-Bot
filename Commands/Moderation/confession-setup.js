const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const ConfessionDB = require("../../Structures/Schemas/ConfessionDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("confession-setup")
        .setDescription("Set the confession channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the confessions to be sent in.").setRequired(true).addChannelTypes(ChannelType.GuildText))
        .addChannelOption(opt => opt.setName("log-channel").setDescription("Channel you would like the confession logs to be sent in.").setRequired(true).addChannelTypes(ChannelType.GuildText)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild } = interaction
        const { emojilist } = client

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
}