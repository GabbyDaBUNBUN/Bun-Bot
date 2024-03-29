const { loadFiles } = require("./FileLoader")
const { CustomClient } = require("../Classes/CustomClient")

/**
 * 
 * @param {CustomClient} client 
 */

async function loadCommands(client) {

    const { commands, application, config, guilds } = client

    commands.clear()

    let Loaded = 0
    let Failed = 0
    let CommandsArray = []

    const files = await loadFiles("Commands")

    files.forEach(file => {

        const command = require(file)
        if (!command.data.name) return Failed++

        commands.set(command.data.name, command)
        CommandsArray.push(command.data)

        Loaded++

    })

    if (Loaded !== 0) console.log(`Loaded ${Loaded} Commands!`)
    if (Failed !== 0) console.log(`Failed to load ${Failed} Commands!`)

    if (config.global === true) {

        application.commands.set(CommandsArray)

    } else {

        const guild = guilds.cache.get(config.defGuildId)
        if (!guild) return

        guild.commands.set(CommandsArray)

    }

}

module.exports = { loadCommands }