const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CreateVCDB = require("../../Structures/Schemas/CreateVCDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-vc-setup")
        .setDescription("Set the create a vc channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the create vc to be. (MUST BE A VC CHANNEL)").setRequired(true).addChannelTypes(ChannelType.GuildVoice))
        .addStringOption(opt => opt.setName("name").setDescription("What you want your create VC channel to be named.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild } = interaction
        const { emojilist } = client

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
}