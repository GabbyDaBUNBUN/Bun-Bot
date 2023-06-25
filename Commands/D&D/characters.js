const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CharactersDB = require("../../Structures/Schemas/CharactersDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("character")
        .setDescription("Character Creation for D&D.")
        .addSubcommand(sub => sub.setName("create")
            .setDescription("Create a character for D&D.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of your character.").setRequired(true))
            .addStringOption(opt => opt.setName("avatar").setDescription("URL of the avatar you want to use.").setRequired(true))
            .addStringOption(opt => opt.setName("proxy").setDescription("Proxy to use your character.").setRequired(true)))
        .addSubcommand(sub => sub.setName("delete")
            .setDescription("Delete a character.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of your character.").setRequired(true)))
        .addSubcommand(sub => sub.setName("edit")
            .setDescription("Edit your already created character.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of your character.").setRequired(true))
            .addStringOption(opt => opt.setName("new-name").setDescription("What you want your characters name to change to.").setRequired(false))
            .addStringOption(opt => opt.setName("avatar").setDescription("What you want your characters new avatar to be.").setRequired(false))
            .addStringOption(opt => opt.setName("proxy").setDescription("What you want your characters new proxy to be.").setRequired(false)))
        .addSubcommand(sub => sub.setName("send")
            .setDescription("Sends the character info.")
            .addStringOption(opt => opt.setName("name").setDescription("Name of the character.").setRequired(true))),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, guild, member } = interaction
        const { emojilist, color } = client

        switch (options.getSubcommand()) {

            case "create": {

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

                break;

            case "delete": {

                const name = options.getString("name")

                const data = CharactersDB.findOne({ GuildID: guild.id, MemberID: member.id, Name: name }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, "There is no character by that name!", false)

                await CharactersDB.findOneAndDelete({ GuildID: guild.id, MemberID: member.id, Name: name }).catch(err => { })

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle(`Character Deleted!`)
                            .setDescription(`Your character ${name} has been deleted!`)
                            .setFooter({ text: "Character Creation by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "edit": {

                const name = options.getString("name")

                const data = CharactersDB.findOne({ GuildID: guild.id, MemberID: member.id, Name: name }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, "There is no character by that name!", false)

                const newName = options.getString("new-name") || data.Name
                const avatar = options.getString("avatar") || data.Avatar
                const proxy = options.getString("proxy") || data.Proxy

                data.Name = newName
                data.Avatar = avatar
                data.Proxy = proxy
                await data.save()

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle(`Character Edited!`)
                            .setDescription(`Your character ${name} has been edited!`)
                            .setFields(
                                {
                                    name: `Name:`,
                                    value: `${name}`,
                                    inline: true,
                                },
                                {
                                    name: `Avatar:`,
                                    value: `${avatar}`,
                                    inline: true,
                                },
                                {
                                    name: `Proxy:`,
                                    value: `${proxy}`,
                                    inline: true
                                },
                            )
                            .setFooter({ text: "Character Creation by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

            case "send": {

                const name = options.getString("name")

                const data = await CharactersDB.findOne({ GuildID: guild.id, MemberID: member.id, Name: name }).catch(err => { })
                if (!data) return Reply(interaction, emojilist.cross, "There is no character by that name!", false)

                const desc = [ `Name: ${data.Name}
                Avatar URL: See below.
                Proxy: \`${data.Proxy}\`
                `]

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle(`Character Info:`)
                            .setDescription(`${desc}`)
                            .setImage(`${data.Avatar}`)
                            .setFooter({ text: "Character Creation by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

                break;

        }

    }

}