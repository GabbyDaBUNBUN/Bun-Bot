const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CountingDB = require("../../Structures/Schemas/CountingDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("counting-setup")
        .setDescription("Set the counting channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the counting to be in.").setRequired(true).addChannelTypes(ChannelType.GuildText))
        .addRoleOption(opt => opt.setName("role").setDescription("Role you want given to the user when they mess up.").setRequired(true)),

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

        let data = await CountingDB.findOne({ Guild: guild.id }).catch(err => { })
        if (data) {

            data.Channel = channel
            data.Role = role
            data.save

        } else if (!data) {

            data = new CountingDB({
                Guild: guild.id,
                Channel: channel,
                Role: role,
            })

            await data.save()

        }

        Reply(interaction, emojilist.tick, `Your counting setup info has been saved!`)

    }
}