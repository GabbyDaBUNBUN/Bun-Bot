const { Events, ButtonInteraction } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")
const ShopDB = require("../../Structures/Schemas/ShopDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: Events.InteractionCreate,

    /**
     * @param { ButtonInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { customId, member, guild, message } = interaction
        const { emojilist } = client

        if (![ "next", "previous", "exit" ].includes(customId)) return

        const data = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })
        if (!data) return Reply(interaction, emojilist.cross, `You have no balance data yet!`, true)

        const shopData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
        if (!shopData) return Reply(interaction, emojilist.cross, `There is no shop set up yet!`, true)

        if (interaction.isButton) {

            const items = shopData.Items
            let currentPage = data.ShopPage
            let pageSize = 10
            let countPages = Math.ceil(items.length / pageSize)

            if (customId === `previous` && currentPage > 0) {

                let prevPage = currentPage - 1

                if (prevPage >= 1) {
                    currentPage = prevPage
                    await data.save()

                    const startIndex = currentPage * pageSize - pageSize
                    const listSplit = [ ...items ].splice(startIndex, pageSize)
                    let list = []

                    listSplit.forEach((i) => {

                        let description = `Name: ${i.ItemName}\nDescription: ${i.ItemDescription}\nPrice: ${i.ItemPrice}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${currentPage}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(currentPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(currentPage === items.length - 1),
                        )

                    message.edit({ embeds: [ Embed ], components: [ Buttons ] })

                } else {
                    currentPage = 1
                    await data.save()

                    const startIndex = currentPage * pageSize - pageSize
                    const listSplit = [ ...items ].splice(startIndex, pageSize)
                    let list = []

                    listSplit.forEach((i) => {

                        let description = `Name: ${i.ItemName}\nDescription: ${i.ItemDescription}\nPrice: ${i.ItemPrice}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${currentPage}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(currentPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(currentPage === items.length - 1),
                        )

                    message.edit({ embeds: [ Embed ], components: [ Buttons ] })

                }

            }

            if (customId === `next` && currentPage < items.length) {

                let nextPage = currentPage + 1

                if (nextPage <= countPages) {
                    currentPage = nextPage
                    await data.save()

                    const startIndex = currentPage * pageSize - pageSize
                    const listSplit = [ ...items ].splice(startIndex, pageSize)
                    let list = []

                    listSplit.forEach((i) => {

                        let description = `Name: ${i.ItemName}\nDescription: ${i.ItemDescription}\nPrice: ${i.ItemPrice}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${currentPage}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(currentPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(currentPage === items.length - 1),
                        )

                    message.edit({ embeds: [ Embed ], components: [ Buttons ] })

                } else {
                    currentPage = countPages
                    await data.save()

                    const startIndex = currentPage * pageSize - pageSize
                    const listSplit = [ ...items ].splice(startIndex, pageSize)
                    let list = []

                    listSplit.forEach((i) => {

                        let description = `Name: ${i.ItemName}\nDescription: ${i.ItemDescription}\nPrice: ${i.ItemPrice}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${currentPage}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(currentPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(currentPage === items.length - 1),
                        )

                    message.edit({ embeds: [ Embed ], components: [ Buttons ] })

                }

            }

            if (customId === `exit`) {
                message.delete()
            }

        }

    }
}