const { Events, ButtonInteraction } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: Events.InteractionCreate,

    /**
     * @param { ButtonInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { customId, user, guild } = interaction
        const { emojilist } = client

        if (!interaction.isButton()) return
        if (customId !== `Rules-Agree`) return

        if (customId === `Rules-Agree`) {

            const Member = guild.members.cache.get(user.id)
            const Role = guild.roles.cache.get(`1077760916982091858`)
            Member.roles.add(Role)

            Reply(interaction, emojilist.tick, `Thank you for agreeing to the rules! Please head over to <#1071994341247176734> to learn how to verify!`, true)

        }

    }
}