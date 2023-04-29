const { GuildMember, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const LevelsDB = require("../../Structures/Schemas/LevelsDB")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")

module.exports = {
    name: Events.GuildMemberRemove,

    /**
     * @param { GuildMember } member
     * @param { CustomClient } client 
     */
    async execute(member, client) {

        const { user, guild } = member
        const { emojilist, color } = client

        if (guild.id !== `1037958833529696276` || `1070558674210267207`) return

        if (guild.id === `1037958833529696276`) {

            const Channel = guild.channels.cache.get("1037998115510288384")

            await EconomyDB.findOneAndDelete({ Guild: guild.id, User: user.id }).catch(err => { })
            await LevelsDB.findOneAndDelete({ Guild: guild.id, User: user.id }).catch(err => { })

            Embed = new EmbedBuilder()
                .setColor(color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
                .setDescription(`${member} has left the server!\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMemberCount: \`${guild.memberCount}\``)
                .setThumbnail(user.displayAvatarURL())
                .setFooter({ text: "Goodbye by Bun Bot" })
                .setTimestamp()

            Channel.send({ content: `Goodbye <@${member.id}>! ${emojilist.cross}`, embeds: [ Embed ] })

        } else if (guild.id === `1070558674210267207`) {

            const Channel = guild.channels.cache.get("1070558675271438427")

            await EconomyDB.findOneAndDelete({ Guild: guild.id, User: user.id }).catch(err => { })
            await LevelsDB.findOneAndDelete({ Guild: guild.id, User: user.id }).catch(err => { })

            Embed = new EmbedBuilder()
                .setColor(color)
                .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
                .setDescription(`${member} has left the server!\n\nAccount Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nMemberCount: \`${guild.memberCount}\``)
                .setThumbnail(user.displayAvatarURL())
                .setFooter({ text: "Goodbye by Bun Bot" })
                .setTimestamp()

            Channel.send({ content: `Goodbye <@${member.id}>! ${emojilist.cross}`, embeds: [ Embed ] })

        }

    }

}