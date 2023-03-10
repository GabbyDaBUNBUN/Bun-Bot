const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")
const ShopDB = require("../../Structures/Schemas/ShopDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Shop Commands.")
        .addSubcommand(sub => sub.setName("view")
            .setDescription("View the shop."))
        .addSubcommand(sub => sub.setName("buy")
            .setDescription("Purchase an item from the shop.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of the item you want to purchase.").setRequired(true)))
        .addSubcommand(sub => sub.setName("use")
            .setDescription("Use an item from your inventory.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of the item you want to use.").setRequired(true))),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, member, guild } = interaction
        const { color, emojilist } = client

        const user = options.getUser("user") || member

        const data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
        if (!data) return Reply(interaction, emojilist.cross, `You have no balance data yet!`, true)

        const shopData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
        if (!shopData) return Reply(interaction, emojilist.cross, `There is no shop set up yet!`, true)

        switch (options.getSubcommand()) {

            case "view": {

                const items = shopData.Items

                let firstListSplit = items.splice(0, 10)
                let firstList = []

                firstListSplit.forEach((i) => {

                    let description = `Name: ${i.ItemName}\nDescription: ${i.ItemDescription}\nPrice: ${i.ItemPrice}\nRole Reward: <@&${i.ItemRole}>`
                    firstList.push(description + `\n\n`)

                })

                const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(`Shop`)
                    .setDescription(firstList.toString())
                    .setFooter({ text: "Page 1" })
                    .setTimestamp()

                const Buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`previous`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`⏮️`)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId(`exit`)
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji(`❌`)
                            .setDisabled(false),
                        new ButtonBuilder()
                            .setCustomId(`next`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`⏭️`)
                            .setDisabled(items.length <= 10),
                    )

                data.ShopPage = 1
                await data.save()

                interaction.reply({ embeds: [ Embed ], components: [ Buttons ] })

            }

                break;

            case "buy": {

                const itemName = options.getString("name")

                let data = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There is no data for you yet!`, true)

                let itemData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!itemData) return Reply(interaction, emojilist.cross, `There are no items in the shop yet!`, true)

                const item = itemData.Items.find((i) => i.ItemName === itemName)
                if (!item) return Reply(interaction, emojilist.cross, `There is no item by that name!`, true)

                if (!data.Inventory) {

                    data.Inventory = [ item ]
                    await data.save()

                } else {

                    data.Inventory.push(item)
                    await data.save()

                }

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Buy")
                            .setDescription(`Your item:\nName: ${item.ItemName}\nDescription: ${item.ItemDescription}\nPrice: ${item.ItemPrice}\nRole Reward: <@&${item.ItemRole}>\n has been added to your inventory!`)
                            .setFooter({ text: "Shop by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "use": {

                const itemName = options.getString("name")

                let data = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There is no data for you yet!`, true)

                let itemData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!itemData) return Reply(interaction, emojilist.cross, `There are no items in the shop yet!`, true)

                if (!data.Inventory) return Reply(interaction, emojilist.cross, `You have no items in your inventory!`)
                const item = data.Inventory.find((i) => i.ItemName === itemName)
                if (!item) return Reply(interaction, emojilist.cross, `There is no item by that name!`, true)

                if (!item.ItemReply) {

                    if (item.ItemRole) {
                        const role = guild.roles.cache.get(item.ItemRole)
                        member.roles.add(role)
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Use")
                                .setDescription(`You have used ${itemName}`)
                                .setFooter({ text: "Shop by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                } else {

                    if (item.ItemRole) {
                        const role = guild.roles.cache.get(item.ItemRole)
                        member.roles.add(role)
                    }

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Use")
                                .setDescription(`${item.ItemReply}`)
                                .setFooter({ text: "Shop by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                }

                const filteredItems = data.Inventory.filter((i) => i.ItemName !== itemName)
                data.Inventory = filteredItems
                await data.save()

            }

        }

    }
}