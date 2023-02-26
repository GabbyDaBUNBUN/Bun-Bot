const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const LevelsDB = require("../../Structures/Schemas/LevelsDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leader-board")
        .setDescription("Displays the leaderboard."),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */

    async execute(interaction, client) {

        const { guild } = interaction
        const { emojilist } = client

        let text = ""

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
            else MemberTag = "Unknown"

            let shortXp = shorten(XP)

            text += `${counter + 1}. ${MemberTag} | XP: ${shortXp} | Level: ${Level}\n`

        }

        interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setColor("0xffc0cb")
                    .setDescription(`\`\`\`${text}\`\`\``)
                    .setFooter({ text: "Leveling System by Bun Bot" })
            ]
        })

    }
}

function shorten(count) {

    const ABBRS = [ "", "k", "m", "t" ]

    const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000))

    let result = parseFloat((count / Math.pow(1000, i)).toFixed(2))
    result += `${ABBRS[ i ]}`

    return result

}