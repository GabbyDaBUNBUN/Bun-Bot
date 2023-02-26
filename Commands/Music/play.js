const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song.")
        .addStringOption(opt => opt.setName("song").setDescription("The name or link of a song.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, member, channel, } = interaction;

        const song = options.getString("song")

        const errorEmbed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setTitle(`Uh Oh`)
            .setDescription(`You must be in a voice channel first!`)
            .setFooter({ text: "Music by Bun Bot" })
            .setTimestamp();

        const voiceChannel = member.voice.channel;
        if (voiceChannel) {
            client.distube.play(voiceChannel, song, {
                textChannel: channel,
                member: member,
            });
        } else {
            channel.send({ embeds: [ errorEmbed ] });
        }

    }
}