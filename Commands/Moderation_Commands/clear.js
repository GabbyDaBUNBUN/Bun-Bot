const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Delete up to 100 messages.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(opt => opt.setName("amount").setDescription("Amount of messages you want deleted.").setRequired(true)),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */

    async execute(interaction, client) {

        const { options, channel, member } = interaction
        const { emojilist, color } = client

        const amount = options.getNumber("amount")
        if (amount >= 101) return Reply(interaction, emojilist.cross, "You can only delete up to 100 messages at a time!", true)

        const msgs = await channel.messages.fetch({ limit: amount })
        msgs.forEach((message) => message.delete())

        const Embed = new EmbedBuilder()
            .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL() })
            .setColor(color)
            .setTitle("Clear Messages")
            .setDescription(`✅ | Successfully deleted ${amount} messages!`)
            .setFooter({ text: "Clear Messages by Bun Bot" })

        interaction.reply({ embeds: [ Embed ] })

    }
}