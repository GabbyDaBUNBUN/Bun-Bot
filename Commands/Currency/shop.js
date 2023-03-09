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
            .addStringOption(opt => opt.setName("name").setDescription("Name of the item you want to purchase.").setRequired(true))),

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

                let firstList = items.splice(0, 10)

                const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle(`Shop`)
                    .setDescription(firstList)
                    .setFooter({ text: "Page 1" })
                    .setTimestamp()

                const Buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`next`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`⏭️`)
                            .setDisabled(false),
                        new ButtonBuilder()
                            .setCustomId(`previous`)
                            .setStyle(ButtonStyle.Primary)
                            .setEmoji(`⏮️`)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId(`exit`)
                            .setStyle(ButtonStyle.Danger)
                            .setEmoji(`❌`)
                            .setDisabled(false)
                    )

                data.ShopPage = 1
                await data.save()

                interaction.reply({ embeds: [ Embed ], components: [ Buttons ] })

            }

                break;

            case "buy": {

                const user = member
                const itemName = options.getString("name")

                let data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There is no data for you yet!`, true)

                let itemData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!itemData) return Reply(interaction, emojilist.cross, `There are no items in the shop yet!`, true)

                const items = itemData.Items
                const item = items.find((i) => i.ItemName === itemName)
                if (!item) return Reply(interaction, emojilist.cross, `There is no item by that name!`, true)

                if (!data.Inventory) {

                    data.Inventory = item
                    await data.save()

                    if (item.ItemRole !== ``) {
                        const role = guild.roles.cache.get(item.ItemRole)
                        member.roles.add(role)
                    }

                } else {

                    data.Inventory = [ ...data.Inventory, item ]
                    await data.save()

                    if (item.ItemRole !== ``) {
                        const role = guild.roles.cache.get(item.ItemRole)
                        member.roles.add(role)
                    }

                }

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Buy")
                            .setDescription(`Your item:\n${item}\n has been added to your inventory!`)
                            .setFooter({ text: "Shop by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

        }

    }
}