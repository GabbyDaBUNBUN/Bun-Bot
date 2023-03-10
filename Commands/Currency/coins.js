const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")
const humanizeDuration = require("humanize-duration")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coins")
        .setDescription("Currency commands.")
        .addSubcommand(sub => sub.setName("balance")
            .setDescription("Sends the users balance and inventory")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to see the balance of.").setRequired(false)))
        .addSubcommand(sub => sub.setName("snuggle")
            .setDescription("Snuggle Bun Bot for coins!"))
        .addSubcommand(sub => sub.setName("pet")
            .setDescription("Pet Bun Bot for coins!."))
        .addSubcommand(sub => sub.setName("give-bal")
            .setDescription("Give another user coins!.")
            .addUserOption(opt => opt.setName("user").setDescription("User you want to give coins to.").setRequired(true))
            .addNumberOption(opt => opt.setName("amount").setDescription("Amount of coins you want to give.").setRequired(true))),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, member, guild } = interaction
        const { color, emojilist, cooldowns } = client

        switch (options.getSubcommand()) {

            case "balance": {

                const user = options.getUser("user") || member.user

                const data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `This user has no Balance data!`)

                let inventoryItems = []
                data.Inventory.forEach((i) => {
                    let itemNames = `${i.ItemName}`
                    inventoryItems.push(itemNames + `\n`)
                })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle(`${user.username}'s Balance`)
                            .setDescription(`Here is a list of your balance and items:`)
                            .setFields(
                                {
                                    name: `Inventory`,
                                    value: `📃 List:\n\n${inventoryItems}`,
                                    inline: true,
                                },
                                {
                                    name: `Balance`,
                                    value: `🪙 ${data.Balance}`,
                                    inline: true,
                                },
                            )
                            .setFooter({ text: "Currency by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "snuggle": {

                const data = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `This user has no Balance data!`)

                const cooldown = cooldowns.get(interaction.user.id && `snuggle`)

                if (cooldown) {

                    const remaining = humanizeDuration(cooldown - Date.now())

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle("Snuggle")
                        .setDescription(`Please wait another ${remaining} before using snuggle again.`)
                        .setFooter({ text: "Currency by Bun Bot" })
                        .setTimestamp()

                    interaction.reply({ embeds: [ Embed ] })

                } else {

                    data.Balance = data.Balance + 3

                    await data.save()

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Snuggle Time!")
                                .setDescription(`<@${member.id}> snuggled Bun Bot and earned 3 🪙!`)
                                .setFooter({ text: "Currency by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                    cooldowns.set(interaction.user.id && `snuggle`, Date.now() + 57600000)

                    setTimeout(() => {
                        cooldowns.delete(interaction.user.id)
                    }, 57600000)

                }

            }

                break;

            case "pet": {

                const data = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `This user has no Balance data!`)

                const cooldown = cooldowns.get(interaction.user.id && `pet`)

                if (cooldown) {

                    const remaining = humanizeDuration(cooldown - Date.now())

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle("Pet")
                        .setDescription(`Please wait another ${remaining} before using pet again.`)
                        .setFooter({ text: "Currency by Bun Bot" })
                        .setTimestamp()

                    interaction.reply({ embeds: [ Embed ] })

                } else {

                    data.Balance = data.Balance + 5

                    await data.save()

                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(color)
                                .setTitle("Pet!")
                                .setDescription(`<@${member.id}> petted Bun Bot and earned 5 🪙!`)
                                .setFooter({ text: "Currency by Bun Bot" })
                                .setTimestamp()
                        ]
                    })

                    cooldowns.set(interaction.user.id && `pet`, Date.now() + 57600000)

                    setTimeout(() => {
                        cooldowns.delete(interaction.user.id)
                    }, 57600000)

                }

            }

                break;

            case "give-bal": {

                const data = await EconomyDB.findOne({ Guild: guild.id, User: member.id }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, `This user has no Balance data!`)

                const targetUser = options.getUser("user")
                const amount = options.getNumber("amount")
                if (data.Balance < amount) return Reply(interaction, emojilist.cross, `You do not have that many coins to give!`, true)

                data.Balance = data.Balance - amount
                await data.save()

                const targetUserData = await EconomyDB.findOne({ Guild: guild.id, User: targetUser.id }).catch(err => { })

                targetUserData.Balance = targetUserData.Balance + amount
                await targetUserData.save()

                const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle("Give Coins")
                    .setDescription(`<@${member.id}> has given <@${targetUser.id}> ${amount} 🪙's!`)
                    .setFooter({ text: "Currency by Bun Bot" })
                    .setTimestamp()

                interaction.reply({ content: `<@${targetUser.id}>`, embeds: [ Embed ] })

            }

        }

    }
}