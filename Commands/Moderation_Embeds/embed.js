const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EmbedDB = require("../../Structures/Schemas/EmbedDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Create a custom embed.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages | PermissionFlagsBits.ManageRoles)
        .addSubcommand(sub => sub.setName("create")
            .setDescription("Create a new embed.")
            .addStringOption(opt => opt.setName("name").setDescription("The name you want your embed saved under.").setRequired(true))
            .addStringOption(opt => opt.setName("title").setDescription("The title of your embed.").setRequired(true))
            .addStringOption(opt => opt.setName("description").setDescription("The description of your embed.").setRequired(true)))
        .addSubcommand(sub => sub.setName("send")
            .setDescription("Sends the embed requested.")
            .addStringOption(opt => opt.setName("name").setDescription("The name of the embed you want sent.").setRequired(true))
            .addRoleOption(opt => opt.setName("role").setDescription("The role you want pinged. (will not ping if left blank)").setRequired(false))
            .addUserOption(opt => opt.setName("user").setDescription("The user you want pinged. (will not ping if left blank)").setRequired(false)))
        .addSubcommand(sub => sub.setName("list").setDescription("Sends a list of your current saved embeds."))
        .addSubcommand(sub => sub.setName("delete")
            .setDescription("Deletes the requested embed.")
            .addStringOption(opt => opt.setName("name").setDescription("The name of the embed you would like to delete.").setRequired(true))),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options, user, member, guild } = interaction
        const { emojilist } = client

        switch (options.getSubcommand()) {

            case "create": {

                const name = options.getString("name")
                const title = options.getString("title")
                const desc = options.getString("description")

                const Data = await EmbedDB.findOne({ Guild: guild.id, Name: name })
                if (!Data) {
                    new EmbedDB({
                        Guild: guild.id,
                        Name: name,
                        Title: title,
                        Description: desc,
                    }).save()
                    return Reply(interaction, emojilist.tick, "Your embed has been saved!")
                }
                else return Reply(interaction, emojilist.cross, "There is already an embed by that name!")

            }

                break;

            case "send": {

                const name = options.getString("name")

                const Data = await EmbedDB.findOne({ Guild: guild.id, Name: name })
                if (!Data) return Reply(interaction, emojilist.cross, "There is no embed by that name!")

                const title = Data.Title

                const desc = Data.Description

                const Member = options.getMember("user") || ``

                var role = options.getRole("role") || ``

                const Embed = new EmbedBuilder()
                    .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
                    .setColor("0xffc0cb")
                    .setTitle(`${title}`)
                    .setDescription(desc)
                    .setFooter({ text: "Embeds by Bun Bot" })
                    .setTimestamp();

                interaction.reply({ content: `${role}${Member}`, embeds: [ Embed ] });

            }

                break;

            case "list": {

                const Data = await EmbedDB.findOne({ Guild: guild.id })
                if (!Data) return Reply(interaction, emojilist.cross, "There are no embeds yet!")

                const list = []
                Data.forEach(data => {

                    list.push(data.Name)

                })

                const filteredList = list.toString().split(`,`).join(`\n`)

                const Embed = new EmbedBuilder()
                    .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
                    .setColor("0xffc0cb")
                    .setTitle(`Embed List`)
                    .setDescription(filteredList)
                    .setFooter({ text: "Embeds by Bun Bot" })
                    .setTimestamp();

                interaction.reply({ embeds: [ Embed ] })

            }

                break;

            case "delete": {

                const name = options.getString("name")

                const Data = await EmbedDB.findOne({ Guild: guild.id, Name: name })
                if (!Data) return Reply(interaction, emojilist.cross, "There is no embed by that name!")

                Data.delete()

                Reply(interaction, emojilist.tick, `Your embed \`${name}\` has been deleted.`)

            }

                break;

        }

    }
}