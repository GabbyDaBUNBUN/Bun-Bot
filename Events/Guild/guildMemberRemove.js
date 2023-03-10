const { GuildMember, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    name: Events.GuildMemberRemove,

    /**
     * @param { GuildMember } member
     * @param { CustomClient } client 
     */
    async execute(member, client) {

        const { user, guild } = member
        const { emojilist } = client

        if (guild.id !== `1037958833529696276`) return

        const Channel = guild.channels.cache.get("1037998115510288384")

        Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setDescription(`${member} has left the server!\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMemberCount: \`${guild.memberCount}\``)
            .setThumbnail(user.displayAvatarURL())
            .setFooter({ text: "Goodbye by Bun Bot" })
            .setTimestamp()

        Channel.send({ content: `Goodbye <@${member.id}>! ${emojilist.cross}`, embeds: [ Embed ] })

    }

}