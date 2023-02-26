const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("repeat-loop")
        .setDescription("Repeats a song, or loops a playlist."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { channel } = interaction;

        const Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setTitle(`Repeat Mode`)
            .setDescription(`Set repeat mode to \`${mode
                ? mode === 2
                    ? 'All Queue'
                    : 'This Song'
                : 'Off'
                }\``)
            .setFooter({ text: "Music by Bun Bot" })
            .setTimestamp();

        const mode = client.distube.setRepeatMode(interaction);
        channel.send({ embeds: [ Embed ] });

    }
}