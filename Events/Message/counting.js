const { Message, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CountingDB = require("../../Structures/Schemas/CountingDB")
const Reply = require("../../Systems/Reply")
const math = require("mathjs")

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { author, guild, content, member, channel } = message
        const { user, emojilist } = client

        //Counting
        const Data = await CountingDB.findOne({ Guild: guild.id }).catch(err => { })
        if (!Data || `<#${channel.id}>` !== Data.Channel || author.bot || isNaN(content[ 0 ])) return
        let Replace = content.replace(/[a-z]/ig, '')
        let solved = math.evaluate(Replace)
        let counting = Data.Count
        if (!Data.Count) counting = 0
        if (!Data.HighScore) Data.HighScore = 0

        if (author.id === Data.LastUser) {
            return Reply(message, emojilist.cross, `Hey! Give someone else a turn you bootyhead!`)
        } else if (Number(solved) === Number(counting) + 1) {
            Data.Count = Number(solved)
            Data.LastUser = author.id
            if (Number(solved) === 69) {
                await message.react(`👀`)
            } else if (Number(solved) % 100 === 0) {
                await message.react(`💯`)
            } else if (Number(solved) <= Data.HighScore) {
                await message.react(`✅`)
            } else if (Number(solved) >= Data.HighScore) {
                await message.react(`🏆`)
                Data.HighScore = Number(solved)
            }
            Data.LastMessageId = message.id
            await Data.save()
        } else if (author.id !== user.id) {
            Data.Count = 0
            if (!Data.Role) {
                Data.LastUser = author.id
            } else {
                let lastUser = guild.members.cache.get(Data.LastUser)
                if (lastUser.roles.cache.has(Data.Role)) { lastUser.roles.remove(Data.Role) }
                member.roles.add(Data.Role)
                Data.LastUser = author.id
            }
            Data.LastMessageId = message.id
            await Data.save()
            return Reply(message, emojilist.cross, `Uh-Oh, You messed up the counting!`);
        }
    }
}