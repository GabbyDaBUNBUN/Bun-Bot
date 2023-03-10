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
        const { emojilist } = client

        if (guild.id !== `1037958833529696276`) return

        const role = guild.roles.cache.get(`1037966143081697382`)
        member.roles.add(role)

        const Channel = guild.channels.cache.get("1041165186930835506")

        Embed = new EmbedBuilder()
            .setColor("0xffc0cb")
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setDescription(`Welcome ${member} to Kawaii Daycare 18+!\n\nWe hope you enjoy your stay here. There are a few things you need to do before you can access the rest of the server. Head over to <#1037959716946591814> read the rules and then follow the directions given to get verified (DO NOT OPEN A TICKET UNTIL YOU ARE READY TO VERIFY). If you do not verify within 24 hours you will be kicked. IF YOU OPEN A TICKET AND THEN LEAVE YOU WILL BE BANNED. We hope you enjoy your stay!\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMemberCount: \`${guild.memberCount}\``)
            .setThumbnail(user.displayAvatarURL())
            .setFooter({ text: "Welcome by Bun Bot" })
            .setTimestamp()

        Channel.send({ content: `Welcome <@${member.id}>! ${emojilist.tick}`, embeds: [ Embed ] })

    }

}