const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient");
const Reply = require("../../Systems/Reply");

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

        const { member, guild } = interaction;
        const { emojilist, distube, color } = client
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return Reply(interaction, emojilist.cross, `You must be in a vc to use this command!`)
        if (!member.voice.channelId == guild.members.me.voice.channelId) return Reply(interaction, emojilist.cross, `I am already being used in another channel, you must be in the same channel as me to use this command!`)
        const queue = distube.getQueue(voiceChannel)
        if (!queue) return Reply(interaction, emojilist.cross, `There are no songs in the queue at this time!`)

        try {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
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
                        .setTimestamp()
                ]
            });
        } catch (error) {
            Reply(interaction, emojilist.cross, `Alert!: ${error}`)
        }

    }
}