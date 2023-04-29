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

        if (guild.id !== `1037958833529696276` || `1070558674210267207`) return

        if (guild.id === `1037958833529696276`) {

            const role = guild.roles.cache.get(`1037966143081697382`)
            member.roles.add(role)

            const Channel = guild.channels.cache.get("1041165186930835506")

            Embed = new EmbedBuilder()
                .setColor(color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
                .setDescription(`Welcome ${member} to Kawaii Daycare 18+!\n\nWe hope you enjoy your stay here. There are a few things you need to do before you can access the rest of the server. Head over to <#1037959716946591814> read the rules and then follow the directions given to get verified.\n\nWe accept cross verification with these servers:\nSherwood Forest(18+)\nGothic Gardens\n\nWe hope you enjoy your stay!\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMemberCount: \`${guild.memberCount}\``)
                .setImage(`https://ucarecdn.com/d06d1f51-5850-49f1-89d2-2346ce19d17e/78080b5ee476d374d3a7b40b1aa463b7.jpg`)
                .setThumbnail(user.displayAvatarURL())
                .setFooter({ text: "Welcome by Bun Bot" })
                .setTimestamp()

            Channel.send({ content: `Welcome <@${member.id}>! ${emojilist.tick}`, embeds: [ Embed ] })

        } else if (guild.id === `1070558674210267207`) {

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

        }

    }

}