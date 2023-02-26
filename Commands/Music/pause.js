const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the music player."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { channel } = interaction;

        const Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setTitle(`Pause`)
            .setDescription(`Paused the music!`)
            .setFooter({ text: "Music by Bun Bot" })
            .setTimestamp();

        client.distube.pause(interaction);
        channel.send({ embeds: [ Embed ] });

    }
}