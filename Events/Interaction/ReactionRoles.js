const { Events, StringSelectMenuInteraction } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const ReactionRolesDB = require("../../Structures/Schemas/ReactionRolesDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: Events.InteractionCreate,

    /**
     * @param { StringSelectMenuInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { customId, values, member, guild } = interaction
        const { emojilist } = client

        const data = await ReactionRolesDB.findOne({ Guild: guild.id, Panel: customId }).catch(err => { })

        if (interaction.isStringSelectMenu()) {
            if (customId === data.Panel) {
                for (let i = 0; i < values.length; i++) {
                    const roleId = values[ i ]

                    const role = guild.roles.cache.get(roleId)
                    const hasRole = member.roles.cache.has(roleId)

                    switch (hasRole) {
                        case true:
                            member.roles.remove(roleId)
                            break;
                        case false:
                            member.roles.add(roleId)
                            break;
                    }
                }

                Reply(interaction, emojilist.tick, "Roles uploaded.")

            }
        }

    }
}