const { Message, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const LevelsChannelDB = require("../../Structures/Schemas/LevelsChannelDB")
const LevelsDB = require("../../Structures/Schemas/LevelsDB")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { author, guild } = message

        //Levels
        if (!guild || author.bot) return

        LevelsDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {

            if (err) throw err

            if (!data) {

                LevelsDB.create({
                    Guild: guild.id,
                    User: author.id,
                    XP: 0,
                    Level: 0,
                })

            }

        })

        EconomyDB.findOne({ Guild: guild.id, User: author.id }, async (err, data) => {

            if (err) throw err

            if (!data) {

                EconomyDB.create({
                    Guild: guild.id,
                    User: author.id,
                    Balance: 0,
                    Inventory: [],
                })

            }

        })

        const channelData = await LevelsChannelDB.findOne({ Guild: guild.id }).catch(err => { })

        const give = Math.floor(Math.random() * 29) + 1

        const data = await LevelsDB.findOne({ Guild: guild.id, User: author.id }).catch(err => { })
        if (!data) return

        const requiredXP = data.Level * data.Level * 100 + 100

        if (data.XP + give >= requiredXP) {

            const econData = await EconomyDB.findOne({ Guild: guild.id, User: author.id }).catch(err => { })
            if (!data) return

            econData.Balance = data.Level += 1
            await econData.save()

            data.XP += give
            data.Level += 1
            await data.save()

            if (channelData) {

                const Channel = guild.channels.cache.get(channelData.Channel)
                if (!Channel) return

                Channel.send({

                    content: `${author}`,
                    embeds: [
                        new EmbedBuilder()
                            .setColor("0xffc0cb")
                            .setDescription(`Congrats you've reached level ${data.Level}!`)
                            .setFooter({ text: "Leveling System by Bun Bot" })
                    ]

                })

            }

        } else {

            data.XP += give
            await data.save()
        }

    }

}