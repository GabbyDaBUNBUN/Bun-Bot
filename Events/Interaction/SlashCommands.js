const { Events, ChatInputCommandInteraction } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: Events.InteractionCreate,

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    execute(interaction, client) {

        if (!interaction.isChatInputCommand()) return

        const { commandName, guild, user } = interaction
        const { commands, emojilist, config } = client
        const command = commands.get(commandName)
        if (!guild) return
        if (!command) return Reply(interaction, emojilist.cross, `The command you are trying to execute does not exist!`) && commands.delete(commandName)
        if (command.owner && !config.devs.includes(user.id)) return Reply(interaction, emojilist.cross, `This command is classified!`)

        command.execute(interaction, client)

    }
}