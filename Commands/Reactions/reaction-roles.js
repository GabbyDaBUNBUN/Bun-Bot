const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const ReactionRolesDB = require("../../Structures/Schemas/ReactionRolesDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reaction-roles")
        .setDescription("Reaction role message.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addSubcommand(sub => sub.setName("add-panel")
            .setDescription("Create a new panel.")
            .addStringOption(opt => opt.setName("panel").setDescription("Name of your new panel.")))
        .addSubcommand(sub => sub.setName("add-role")
            .setDescription("Add a custom role.")
            .addStringOption(opt => opt.setName("panel").setDescription("Name of your panel.").setRequired(true))
            .addRoleOption(opt => opt.setName("role").setDescription("Role you want added.").setRequired(true))
            .addStringOption(opt => opt.setName("description").setDescription("Description of the role.").setRequired(false))
            .addStringOption(opt => opt.setName("emoji").setDescription("Emoji for the role.").setRequired(false)))
        .addSubcommand(sub => sub.setName("remove-role")
            .setDescription("Remove requested custom role.")
            .addStringOption(opt => opt.setName("panel").setDescription("Name of the panel that holds the role you want to remove.").setRequired(true))
            .addRoleOption(opt => opt.setName("role").setDescription("Role you want removed.").setRequired(true)))
        .addSubcommand(sub => sub.setName("send-panel")
            .setDescription("Sends reaction role panel.")
            .addStringOption(opt => opt.setName("panel").setDescription("Name of the panel you would like to send.").setRequired(true))
            .addStringOption(opt => opt.setName("title").setDescription("Title of your panel.").setRequired(true))
            .addStringOption(opt => opt.setName("description").setDescription("Description for your panel embed.").setRequired(true))
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the panel sent to.").setRequired(false))),
    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options, guild, member, channel } = interaction
        const { emojilist, color } = client

        switch (options.getSubcommand()) {

            case "add-panel": {

                const panel = options.getString("panel")

                let data = await ReactionRolesDB.findOne({ Guild: guild.id, Panel: panel }).catch(err => { })

                if (!data) {

                    data = new ReactionRolesDB({
                        Guild: guild.id,
                        Panel: panel,
                    })

                    await data.save()

                    Reply(interaction, emojilist.tick, `Your panel \`${panel}\` has been successfully saved!`)

                } else {

                    Reply(interaction, emojilist.cross, `You already have a panel by that name!`)

                }

            }

                break;

            case "add-role": {

                const panel = options.getString("panel")
                const role = options.getRole("role")
                const description = options.getString("description")
                const emoji = options.getString("emoji")

                try {

                    if (role.position >= member.roles.highest)
                        return Reply(interaction, emojilist.cross, "I don't have the required permissions for that.", true)

                    let data = await ReactionRolesDB.findOne({ Guild: guild.id, Panel: panel }).catch(err => { })

                    const newRole = {
                        roleId: role.id,
                        roleDescription: description || "No description.",
                        roleEmoji: emoji || "",
                    }

                    if (data) {
                        let roleData = data.Roles.find((x => x.roleId === role.id))

                        if (roleData) {
                            roleData = newRole
                        } else {
                            data.Roles = [ ...data.Roles, newRole ]
                        }

                        await data.save()

                        return Reply(interaction, emojilist.tick, `New reaction role ${role.name} created.`)

                    } else {

                        Reply(interaction, emojilist.cross, `You do not have a panel by that name set up yet! Use \`/add-panel\` to create one.`)

                    }

                } catch (error) {
                    console.log(error)
                }

            }

                break;

            case "remove-role": {

                const panel = options.getString("panel")
                const role = options.getRole("role")

                try {

                    const data = await ReactionRolesDB.findOne({ Guild: guild.id, Panel: panel }).catch(err => { })

                    if (!data)
                        return Reply(interaction, emojilist.cross, "This panel does not have reaction roles yet, or you haven't set up any reaction roles yet.")

                    const roles = data.Roles
                    const findRole = roles.find((r) => r.roleId === role.id)

                    if (!findRole)
                        return Reply(interaction, emojilist.cross, "This role does not exist.")

                    const filteredRoles = roles.filter((r) => r.roleId !== role.id)
                    data.Roles = filteredRoles

                    await data.save()

                    return Reply(interaction, emojilist.tick, `Removed reaction role successfully.`)

                } catch (error) {
                    console.log(error)
                }


            }

                break;

            case "send-panel": {

                try {
                    const panel = options.getString("panel")
                    const title = options.getString("title")
                    const description = options.getString("description")
                    const Channel = options.getChannel("channel") || channel
                    const data = await ReactionRolesDB.findOne({ Guild: guild.id, Panel: panel }).catch(err => { })

                    if (!data.Roles.length > 0)
                        return Reply(interaction, emojilist.cross, "This panel does not have any reaction roles yet.")

                    const panelEmbed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle(`${title}`)
                        .setDescription(`${description}`)
                        .setFooter({ text: "Reaction Roles by Bun Bot" })
                        .setTimestamp()

                    const roleOptions = data.Roles.map(x => {
                        const role = guild.roles.cache.get(x.roleId)

                        return {
                            label: role.name,
                            value: role.id,
                            description: x.roleDescription,
                            emoji: x.roleEmoji || undefined,
                        }
                    })

                    const menuComponents = [
                        new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId(`${panel}`)
                                .setMinValues(0)
                                .setMaxValues(roleOptions.length)
                                .addOptions(roleOptions)
                        )
                    ]

                    Channel.send({ embeds: [ panelEmbed ], components: menuComponents })

                    return Reply(interaction, emojilist.tick, "Your panel has been sent successfully.")

                } catch (error) {
                    console.log(error)
                }

            }

        }

    }

}