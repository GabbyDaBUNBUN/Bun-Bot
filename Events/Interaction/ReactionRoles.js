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

                if (values.length >= 1) {

                    const roles = data.Roles
                    roles.forEach(role => {
                        let eachValue = values.find(value => value === role.roleId)
                        if (eachValue) {
                            member.roles.add(role.roleId)
                        } else {
                            member.roles.remove(role.roleId)
                        }
                    })

                } else if (values.length == 0) {
                    const roles = data.Roles
                    roles.forEach(role => {

                        let eachRole = role.roleId
                        member.roles.remove(eachRole)

                    })
                }

                Reply(interaction, emojilist.tick, "Roles uploaded.")

            }
        }

    }
}