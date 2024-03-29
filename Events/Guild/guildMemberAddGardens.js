const { GuildMember, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    name: Events.GuildMemberAdd,

    /**
     * @param { GuildMember } member
     * @param { CustomClient } client 
     */
    async execute(member, client) {

        const { user, guild } = member
        const { emojilist, color } = client

        if (guild.id !== `1070558674210267207`) return

        const role = guild.roles.cache.get(`1083991702311809054`)
        member.roles.add(role)

        const Channel = guild.channels.cache.get("1070558675271438427")

        Embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setDescription(`Hello ${member}, welcome to 𝔊𝔬𝔱𝔥𝔦𝔠 𝔤𝔞𝔯𝔡𝔢𝔫𝔰….. wander our maze of flowers and vines to find your peace.\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMemberCount: \`${guild.memberCount}\``)
            .setThumbnail(user.displayAvatarURL())
            .setFooter({ text: "Someone has wandered through our gates….." })
            .setTimestamp()

        Channel.send({ content: `Welcome <@${member.id}>! ${emojilist.tick}`, embeds: [ Embed ] })

        const Channels = [ `1109203130815627264`, `1109203434349023273` ]

        Channels.forEach(async chan => {
            const PingChannel = guild.channels.cache.get(`${chan}`)
            PingChannel.send({ content: `<@${member.id}>` }).then(msg => msg.delete(10000));
        })

    }

}