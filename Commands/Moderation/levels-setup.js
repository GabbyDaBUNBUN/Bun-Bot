const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const LevelsChannelDB = require("../../Structures/Schemas/LevelsChannelDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("levels-setup")
        .setDescription("Set the leveling channel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the leveling updates to be in.").setRequired(true).addChannelTypes(ChannelType.GuildText)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild } = interaction
        const { emojilist } = client

        const channel = options.getChannel("channel")

        let data = await LevelsChannelDB.findOne({ Guild: guild.id }).catch(err => { })
        if (data) {

            data.Channel = channel
            data.save

        } else if (!data) {

            data = new LevelsChannelDB({
                Guild: guild.id,
                Channel: channel,
            })

            await data.save()

        }

        Reply(interaction, emojilist.tick, `Your levels setup info has been saved!`)

    }
}