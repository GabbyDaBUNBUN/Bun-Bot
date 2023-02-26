const { GatewayIntentBits, Partials } = require("discord.js")
const { CustomClient } = require("./Classes/CustomClient")
const { loadEvents } = require("./Functions/EventLoader")
const ms = require("ms")
require("dotenv").config()

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
const { YtDlpPlugin } = require("@distube/yt-dlp")

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

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: true,
    plugins: [ new SoundCloudPlugin(), new SpotifyPlugin(), new YtDlpPlugin() ],
})

loadEvents(client)

client.start()