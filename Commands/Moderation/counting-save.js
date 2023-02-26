const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CountingDB = require("../../Structures/Schemas/CountingDB")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("counting-save")
        .setDescription("Resets the count back to x number.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addNumberOption(opt => opt.setName("number").setDescription("The number you want it reset to.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, user, member, guild } = interaction;

        const number = options.getNumber("number")

        const data = await CountingDB.findOne({ Guild: guild.id })
        if (!data) return

        data.Count = number
        await data.save()

        let newNumber = number + 1

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor("0xffc0cb")
            .setTitle(`Counting Save`)
            .setDescription(`You have saved the count! Your count will now begin at ${newNumber}!`)
            .setFooter({ text: "Sent by Bun Bot" })
            .setTimestamp();

        interaction.reply({ embeds: [ Embed ] })

    }
}