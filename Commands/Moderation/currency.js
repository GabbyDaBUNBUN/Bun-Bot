const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")
const ShopDB = require("../../Structures/Schemas/ShopDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("currency")
        .setDescription("Currency commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("modify-bal-add")
            .setDescription("Add currency to a user.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to add currency to.").setRequired(true))
            .addNumberOption(opt => opt.setName("amount").setDescription("Amount of currency you want to add.").setRequired(true))
        )
        .addSubcommand(sub => sub.setName("modify-bal-remove")
            .setDescription("Remove currency from a user.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to remove currency from.").setRequired(true))
            .addNumberOption(opt => opt.setName("amount").setDescription("Amount of currency you want to remove.").setRequired(true))
        )
        .addSubcommand(sub => sub.setName("shop-add")
            .setDescription("Add inventory to a user.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of the item.").setRequired(true))
            .addNumberOption(opt => opt.setName("price").setDescription("Price of the item.").setRequired(true))
            .addNumberOption(opt => opt.setName("stock").setDescription("The amount available.").setRequired(true))
            .addRoleOption(opt => opt.setName("role").setDescription("Role you want given to the user when item is purchased.").setRequired(false))
            .addStringOption(opt => opt.setName("description").setDescription("Description of the item.").setRequired(false))
        )
        .addSubcommand(sub => sub.setName("shop-remove")
            .setDescription("Remove item from the shop.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of the item you want to remove.").setRequired(true))
        )
        .addSubcommand(sub => sub.setName("modify-inv-add")
            .setDescription("Add inventory to a user.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to add the item too.").setRequired(true))
            .addStringOption(opt => opt.setName("name").setDescription("Name of the item you want to add.").setRequired(true))
        )
        .addSubcommand(sub => sub.setName("modify-inv-remove")
            .setDescription("Remove inventory from a user.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to remove the item from.").setRequired(true))
            .addStringOption(opt => opt.setName("name").setDescription("Name of the item you want to remove.").setRequired(true))
        ),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options, member, guild } = interaction
        const { color, emojilist } = client

        switch (options.getSubcommand()) {

            case "modify-bal-add": {

                const user = options.getUser("user")
                const amount = options.getNumber("amount")

                const data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `That user does not exist!`, true)

                data.Balance = data.Balance + amount
                await data.save()

                interaction.reply({
                    content: `<@${user.id}>`, embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Modify Balance")
                            .setDescription(`<@${member.id}> has added ${amount} to <@${user.id}>!`)
                            .setFooter({ text: "Currency by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "modify-bal-remove": {

                const user = options.getUser("user")
                const amount = options.getNumber("amount")

                const data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `That user does not exist!`, true)

                data.Balance = data.Balance - amount
                await data.save()

                interaction.reply({
                    content: `<@${user.id}>`, embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Modify Balance")
                            .setDescription(`<@${member.id}> has removed ${amount} from <@${user.id}>!`)
                            .setFooter({ text: "Currency by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "shop-add": {

                const name = options.getString("name")
                const price = options.getNumber("price")
                const stock = options.getNumber("stock")
                const role = options.getRole("role") || ``
                const description = options.getString("description") || ``

                let data = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })

                const newItem = {
                    ItemName: name,
                    ItemPrice: price,
                    ItemStock: stock,
                    ItemRole: role,
                    ItemDescription: description,
                }

                if (!data) {

                    data = new ShopDB.create({
                        Guild: guild.id,
                        Items: newItem,
                    })

                    await data.save()

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Shop Add")
                                .setDescription(`Your item:\n${newItem}\n\nHas been saved!`)
                                .setFooter({ text: "Shop by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                } else {

                    let itemData = data.Items.find((x => x.ItemName === name))

                    if (itemData) {

                        return Reply(interaction, emojilist.cross, `There is already an item by that name!`, true)

                    } else {

                        data.Items = [ ...data.Items, newItem ]

                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor(color)
                                    .setTitle("Shop Add")
                                    .setDescription(`Your item:\n${newItem}\n\nHas been saved!`)
                                    .setFooter({ text: "Shop by Bun Bot" })
                                    .setTimestamp()
                            ]
                        })

                    }

                    await data.save()

                }

            }

                break;

            case "shop-remove": {

                const name = options.getString("name")

                let data = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There are no items in the shop to remove!`, true)

                const items = data.Items
                const findItem = items.find((i) => i.ItemName === name)

                if (!findItem) {

                    return Reply(interaction, emojilist.cross, `There is no item by this name!`, true)

                } else {

                    const filteredItems = items.filter((i) => i.ItemName !== name)
                    data.Items = filteredItems

                    await data.save()

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Shop Remove")
                                .setDescription(`Your item has been removed!`)
                                .setFooter({ text: "Shop by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                }

            }

                break;

            case "modify-inv-add": {

                const user = options.getUser("user")
                const itemName = options.getString("name")

                let data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There is no data for this user!`, true)

                let itemData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!itemData) return Reply(interaction, emojilist.cross, `There are no items in the shop yet!`, true)

                const items = itemData.Items
                const item = items.find((i) => i.ItemName === itemName)
                if (!item) return Reply(interaction, emojilist.cross, `There is no item by that name!`, true)

                if (!data.Inventory) {

                    data.Inventory = item
                    await data.save()

                } else {

                    data.Inventory = [ ...data.Inventory, item ]
                    await data.save()

                }

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Modify Inventory")
                            .setDescription(`Your item:\n${item}\n has been given to <@${user.id}>!`)
                            .setFooter({ text: "Shop by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "modify-inv-remove": {

                const user = options.getUser("user")
                const itemName = options.getString("name")

                let data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `There is no data for this user!`, true)

                let itemData = await ShopDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!itemData) return Reply(interaction, emojilist.cross, `There are no items in the shop yet!`, true)

                const items = itemData.Items
                const item = items.find((i) => i.ItemName === itemName)
                if (!item) return Reply(interaction, emojilist.cross, `There is no item by that name!`, true)

                const userItems = data.Inventory
                const userItem = userItems.find((i) => i.ItemName === itemName)
                if (!userItem) return Reply(interaction, emojilist.cross, `This user does not have any item by that name!`, true)

                if (item === itemName && userItem === itemName) {

                    const filteredItems = items.filter((i) => i.ItemName !== itemName)
                    data.Inventory = filteredItems
                    await data.save()

                } else {
                    return Reply(interaction, emojilist.cross, `We encountered an error trying to remove the item!`, true)
                }

            }

                break;

        }

    }
}