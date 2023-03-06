const { GatewayIntentBits, Partials } = require("discord.js")
const { CustomClient } = require("./Classes/CustomClient")
const { loadEvents } = require("./Functions/EventLoader")
const ms = require("ms")
require("dotenv").config()

const client = new CustomClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildMember,
        Partials.ThreadMember,
        Partials.User,
        Partials.GuildScheduledEvent,
    ],
    allowedMentions: { parse: [ "everyone", "roles", "users" ] },
    rest: { timeout: ms("1m") },
})

loadEvents(client)

client.start()