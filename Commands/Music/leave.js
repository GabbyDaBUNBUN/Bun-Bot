const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Kicks the bot from the vc."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { channel } = interaction;

        const Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setTitle(`Leave`)
            .setDescription(`Left the voice channel!`)
            .setFooter({ text: "Music by Bun Bot" })
            .setTimestamp();

        client.distube.voices.get(interaction)?.leave();
        channel.send({ embeds: [ Embed ] });

    }
}