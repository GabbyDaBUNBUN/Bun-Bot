const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const SafeWordDB = require("../../Structures/Schemas/SafeWordDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("safe-word-setup")
        .setDescription("Set the safe word admin role.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(opt => opt.setName("safeword").setDescription("The word you want to use for the safeword.").setRequired(true))
        .addRoleOption(opt => opt.setName("role").setDescription("Role you want pinged when the safe word is used.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild } = interaction
        const { emojilist } = client

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
}