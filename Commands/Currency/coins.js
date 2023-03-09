const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")
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
        const { color, emojilist } = client

        const user = options.getUser("user") || member

        const data = await EconomyDB.findOne({ Guild: guild.id, User: user.id }).catch(err => { })
        if (!data) return Reply(interaction, emojilist.cross, `This user has no Balance data!`)

        switch (options.getSubcommand()) {

            case "balance": {

                const description = `Balance: ${data.Balance}\nInventory: ${data.Inventory}`

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Balance")
                            .setDescription(description)
                            .setFooter({ text: "Currency by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "snuggle": {

                let memberBalance = data.Balance
                memberBalance = memberBalance + 3

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

            }

                break;

            case "pet": {

                let memberBalance = data.Balance
                memberBalance = memberBalance + 5

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

            }

                break;

            case "give-bal": {

                const targetUser = options.getUser("user")
                const amount = options.getNumber("amount")

                let memberBalance = data.Balance
                memberBalance = memberBalance - amount
                await data.save()

                const targetUserData = await EconomyDB.findOne({ Guild: guild.id, User: targetUser.id }).catch(err => { })

                let targetUserBalance = targetUserData.Balance
                targetUserBalance = targetUserBalance + amount
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