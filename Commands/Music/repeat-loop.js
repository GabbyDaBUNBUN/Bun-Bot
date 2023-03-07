const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient");
const Reply = require("../../Systems/Reply");

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

        const { channel, member, guild } = interaction;
        const { emojilist, distube, color } = client
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return Reply(interaction, emojilist.cross, `You must be in a vc to use this command!`)
        if (!member.voice.channelId == guild.members.me.voice.channelId) return Reply(interaction, emojilist.cross, `I am already being used in another channel, you must be in the same channel as me to use this command!`)

        try {
            const mode = distube.setRepeatMode(voiceChannel);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Repeat Mode`)
                        .setDescription(`Set repeat mode to \`${mode
                            ? mode === 2
                                ? 'All Queue'
                                : 'This Song'
                            : 'Off'
                            }\``)
                        .setFooter({ text: "Music by Bun Bot" })
                        .setTimestamp()
                ],
                ephemeral: true,
            });
        } catch (error) {
            Reply(interaction, emojilist.cross, `Alert!: ${error}`)
        }

    }
}