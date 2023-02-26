const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { channel } = interaction;

        const Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setTitle(`Skip`)
            .setDescription(`Skipped the track!`)
            .setFooter({ text: "Music by Bun Bot" })
            .setTimestamp();

        client.distube.skip(interaction);
        channel.send({ embeds: [ Embed ] });

    }
}