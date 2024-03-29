const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, AttachmentBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const LevelsDB = require("../../Structures/Schemas/LevelsDB")
const Reply = require("../../Systems/Reply")
const Canvacord = require("canvacord")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Displays rank card.")
        .addUserOption(opt => opt.setName("user").setDescription("Select a user.").setRequired(false)),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */

    async execute(interaction, client) {

        const { options, user, guild } = interaction
        const { emojilist, color } = client

        const Member = options.getMember("user") || user
        const member = guild.members.cache.get(Member.id)

        const Data = await LevelsDB.findOne({ Guild: guild.id, User: member.id })
        if (!Data) return Reply(interaction, emojilist.cross, `${member} has not gained any XP!`)

        const data = await LevelsDB.find({ Guild: guild.id })
            .sort({
                XP: -1,
                Level: -1,
            })
            .catch(err => { })

        let userRank = []

        for (let counter = 0; counter < data.length; ++counter) {

            const { User, XP, Level = 0 } = data[ counter ]

            const Member = guild.members.cache.get(User)

            if (Data.User === User) userRank.push(counter + 1)

        }

        await interaction.deferReply()

        const Required = Data.Level * Data.Level * 100 + 100

        const rank = new Canvacord.Rank()
            .setAvatar(member.displayAvatarURL({ forceStatic: true }))
            .setBackground("IMAGE", "https://ucarecdn.com/09887477-2cd3-4a5b-a11e-a453c068a4f9/020118a0ecba3ad7c5cf01b89dd4a3ac.png")
            .setCurrentXP(Data.XP)
            .setRequiredXP(Required)
            .setRank(userRank[ 0 ], "Rank", true)
            .setLevel(Data.Level, "Level")
            .setProgressBar("#ffc0cb", "COLOR")
            .setUsername(member.user.username)

        const Card = await rank.build().catch(err => console.log(err))

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle(`${member.user.username}'s Rank Card:`)
            .setImage("attachment://rank.png")
            .setFooter({ text: "Leveling System by Bun Bot" })

        interaction.editReply({ files: [ new AttachmentBuilder(Card, { name: "rank.png" }) ], embeds: [ Embed ] })

    }
}