const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const LevelsDB = require("../../Structures/Schemas/LevelsDB")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leader-board")
        .setDescription("Leader-board commands.")
        .addSubcommand(sub => sub.setName("levels")
            .setDescription("Levels leader-board."))
        .addSubcommand(sub => sub.setName("coins")
            .setDescription("Coins leader-board.")),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */

    async execute(interaction, client) {

        const { guild, options } = interaction
        const { emojilist } = client

        switch (options.getSubcommand()) {

            case "levels": {

                const Embed = new EmbedBuilder()
                    .setColor("0xffc0cb")
                    .setTitle("Level Leader-Board")
                    .setDescription(`Here is a list of the current leaders:`)
                    .setFooter({ text: "Leveling System by Bun Bot" })
                    .setTimestamp()

                const Data = await LevelsDB.find({ Guild: guild.id })
                    .sort({
                        XP: -1,
                        Level: -1,
                    })
                    .limit(10)
                    .catch(err => { })

                if (!Data) return Reply(interaction, emojilist.cross, "The Leaderboard is currently empty at this time.")

                await interaction.deferReply()

                for (let counter = 0; counter < Data.length; ++counter) {

                    const { User, XP, Level = 0 } = Data[ counter ]

                    const Member = guild.members.cache.get(User)

                    let MemberTag

                    if (Member) MemberTag = Member.user.tag
                    else MemberTag = `User ID: ${User}`

                    let shortXp = shorten(XP)

                    Embed.addFields(
                        {
                            name: `**${counter + 1}.** ${MemberTag}`,
                            value: `**XP:** ${shortXp}\n**Level:** ${Level}\n`,
                            inline: false,
                        },
                    )

                }

                interaction.editReply({ embeds: [ Embed ] })

            }

                break;

            case "coins": {

                const Embed = new EmbedBuilder()
                    .setColor("0xffc0cb")
                    .setTitle("Coins Leader-Board")
                    .setDescription(`Here is a list of the current leaders:`)
                    .setFooter({ text: "Currency by Bun Bot" })
                    .setTimestamp()

                const Data = await EconomyDB.find({ Guild: guild.id })
                    .sort({
                        Balance: -1,
                    })
                    .limit(10)
                    .catch(err => { })

                if (!Data) return Reply(interaction, emojilist.cross, "The Leaderboard is currently empty at this time.")

                await interaction.deferReply()

                for (let counter = 0; counter < Data.length; ++counter) {

                    const { User, Balance = 0 } = Data[ counter ]

                    const Member = guild.members.cache.get(User)

                    let MemberTag

                    if (Member) MemberTag = Member.user.tag
                    else MemberTag = `User ID: ${User}`

                    Embed.addFields(
                        {
                            name: `**${counter + 1}.** ${MemberTag}`,
                            value: `🪙${Balance}`
                        }
                    )

                }

                interaction.editReply({ embeds: [ Embed ] })

            }

                break;

        }

    }
}

function shorten(count) {

    const ABBRS = [ "", "k", "m", "t" ]

    const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000))

    let result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
    result += `${ABBRS[ i ]}`

    return result

}