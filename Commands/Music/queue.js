const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Shows the current songs in queue."),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { channel } = interaction;

        const queue = client.distube.getQueue(interaction);
        if (!queue) {

            const errorEmbed = new EmbedBuilder()
                .setColor("0xffc0cb")
                .setTitle(`Uh Oh`)
                .setDescription(`Nothing playing right now!`)
                .setFooter({ text: "Music by Bun Bot" })
                .setTimestamp();

            channel.send({ embeds: [ errorEmbed ] });

        } else {

            const Embed = new EmbedBuilder()
                .setColor("0xffc0cb")
                .setTitle(`Queue`)
                .setDescription(`Current queue:\n${queue.songs
                    .map(
                        (song, id) =>
                            `**${id ? id : 'Playing'}**. ${song.name
                            } - \`${song.formattedDuration}\``,
                    )
                    .slice(0, 10)
                    .join('\n')}`)
                .setFooter({ text: "Music by Bun Bot" })
                .setTimestamp();

            channel.send({ embeds: [ Embed ] });

        }

    }
}