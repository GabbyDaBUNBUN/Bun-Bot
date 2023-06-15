const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CharactersDB = require("../../Structures/Schemas/CharactersDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("character-creation")
        .setDescription("Create a character for D&D.")
        .addStringOption(opt => opt.setName("name").setDescription("Name of your character.").setRequired(true))
        .addStringOption(opt => opt.setName("avatar").setDescription("URL of the avatar you want to use.").setRequired(true))
        .addStringOption(opt => opt.setName("proxy").setDescription("Proxy to use your character.").setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    execute(interaction, client) {

        const { options, guild, member } = interaction
        const { emojilist, color } = client

        const name = options.getString("name")
        const avatar = options.getString("avatar")
        const proxy = options.getString("proxy")

        CharactersDB.findOne({ GuildID: guild.id, MemberID: member.id, Name: name }, async (err, data) => {
            if (err) throw err

            if (!data) {
                CharactersDB.create({
                    GuildID: guild.id,
                    MemberID: member.id,
                    Name: name,
                    Avatar: avatar,
                    Proxy: proxy,
                })
            } else {
                return Reply(interaction, emojilist.cross, "You have already created that character!", true)
            }
        })

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(color)
                    .setTitle(`Character Created!`)
                    .setDescription(`Your character ${name} has been created!`)
                    .setFooter({ text: "Character Creation by Bun Bot" })
                    .setTimestamp()
            ]
        })

    }
}