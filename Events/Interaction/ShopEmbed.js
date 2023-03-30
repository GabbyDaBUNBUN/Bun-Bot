const { Events, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
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
        const { emojilist, color } = client

        if (!interaction.isButton()) return

        if (![ "next", "previous", "exit" ].includes(customId)) return

        const data = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })
        if (!data) return Reply(interaction, emojilist.cross, `You have no balance data yet!`, true)

        const shopData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
        if (!shopData) return Reply(interaction, emojilist.cross, `There is no shop set up yet!`, true)

        if (interaction.isButton) {

            const items = shopData.Items
            let pageSize = 5
            let countPages = Math.ceil(items.length / pageSize)

            if (customId === `previous` && data.ShopPage > 0) {

                let prevPage = data.ShopPage - 1

                if (prevPage >= 1) {
                    data.ShopPage = data.ShopPage - 1
                    await data.save()

                    const startIndex = data.ShopPage * pageSize - pageSize
                    const listSplit = items.splice(startIndex, pageSize)
                    let list = []
                    let disabled = false
                    if (data.ShopPage >= countPages) {
                        disabled = true
                    } else {
                        disabled = false
                    }

                    listSplit.forEach((i) => {

                        let description = `🪙**${i.ItemPrice}** **-** **Name: ${i.ItemName}**\nDescription: ${i.ItemDescription}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description + `\n\n`)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${data.ShopPage} of ${countPages}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(data.ShopPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(disabled),
                        )

                    interaction.update({ embeds: [ Embed ], components: [ Buttons ] })

                } else {
                    data.ShopPage = 1
                    await data.save()

                    const startIndex = data.ShopPage * pageSize - pageSize
                    const listSplit = items.splice(startIndex, pageSize)
                    let list = []
                    let disabled = false
                    if (data.ShopPage >= countPages) {
                        disabled = true
                    } else {
                        disabled = false
                    }

                    listSplit.forEach((i) => {

                        let description = `🪙**${i.ItemPrice}** **-** **Name: ${i.ItemName}**\nDescription: ${i.ItemDescription}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description + `\n\n`)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${data.ShopPage} of ${countPages}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(data.ShopPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(disabled),
                        )

                    interaction.update({ embeds: [ Embed ], components: [ Buttons ] })

                }

            }

            if (customId === `next` && data.ShopPage <= countPages) {

                let nextPage = data.ShopPage + 1

                if (nextPage < countPages) {
                    data.ShopPage = data.ShopPage + 1
                    await data.save()

                    const startIndex = data.ShopPage * pageSize - pageSize
                    const listSplit = items.splice(startIndex, pageSize)
                    let list = []
                    let disabled = false
                    if (data.ShopPage >= countPages) {
                        disabled = true
                    } else {
                        disabled = false
                    }

                    listSplit.forEach((i) => {

                        let description = `🪙**${i.ItemPrice}** **-** **Name: ${i.ItemName}**\nDescription: ${i.ItemDescription}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description + `\n\n`)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${data.ShopPage} of ${countPages}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(data.ShopPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(disabled),
                        )

                    interaction.update({ embeds: [ Embed ], components: [ Buttons ] })

                } else {
                    data.ShopPage = countPages
                    await data.save()

                    const startIndex = data.ShopPage * pageSize - pageSize
                    const listSplit = items.splice(startIndex, pageSize)
                    let list = []
                    let disabled = false
                    if (data.ShopPage >= countPages) {
                        disabled = true
                    } else {
                        disabled = false
                    }

                    listSplit.forEach((i) => {

                        let description = `🪙**${i.ItemPrice}** **-** **Name: ${i.ItemName}**\nDescription: ${i.ItemDescription}\nRole Reward: <@&${i.ItemRole}>`
                        list.push(description + `\n\n`)

                    })

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`Shop`)
                        .setDescription(list.toString())
                        .setFooter({ text: `Page ${data.ShopPage} of ${countPages}` })
                        .setTimestamp()

                    const Buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`previous`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏮️`)
                                .setDisabled(data.ShopPage === 1),
                            new ButtonBuilder()
                                .setCustomId(`exit`)
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji(`❌`)
                                .setDisabled(false),
                            new ButtonBuilder()
                                .setCustomId(`next`)
                                .setStyle(ButtonStyle.Primary)
                                .setEmoji(`⏭️`)
                                .setDisabled(disabled),
                        )

                    interaction.update({ embeds: [ Embed ], components: [ Buttons ] })

                }

            }

            if (customId === `exit`) {
                message.delete()
            }

        }

    }
}