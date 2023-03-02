const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const QotdDB = require("../../Structures/Schemas/QotdDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("qotd-setup")
        .setDescription("Set the qotd channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the qotd to be sent in.").setRequired(true).addChannelTypes(ChannelType.GuildText))
        .addRoleOption(opt => opt.setName("role").setDescription("Role you want pinged when qotd is sent.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild } = interaction
        const { emojilist } = client

        const channel = options.getChannel("channel")
        const role = options.getRole("role")

        let data = await QotdDB.findOne({ Guild: guild.id }).catch(err => { })
        if (data) {

            data.Channel = channel
            data.Role = role
            data.save

        } else if (!data) {

            data = new QotdDB({
                Guild: guild.id,
                Channel: channel,
                Role: role,
            })

            await data.save()

        }

        Reply(interaction, emojilist.tick, `Your qotd setup info has been saved!`)

    }
}