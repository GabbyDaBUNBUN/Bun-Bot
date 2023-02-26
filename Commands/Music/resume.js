const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes play."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { channel } = interaction;

        const Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setTitle(`Resume`)
            .setDescription(`Resumed the music!`)
            .setFooter({ text: "Music by Bun Bot" })
            .setTimestamp();

        client.distube.resume(interaction);
        channel.send({ embeds: [ Embed ] });

    }
}