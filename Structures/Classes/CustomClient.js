const { Client, Collection } = require("discord.js")
const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")
const { YtDlpPlugin } = require("@distube/yt-dlp")
const emojis = require("../../emojis.json")
const configuration = require("../../config.json")
const mongoose = require("mongoose")

class CustomClient extends Client {

    color = "0xFFC0CB"
    emojilist = emojis
    config = configuration
    commands = new Collection()
    voiceCollection = new Collection()
    distube = new DisTube(Client, {
        emitNewSongOnly: true,
        leaveOnFinish: true,
        emitAddSongWhenCreatingQueue: true,
        plugins: [ new SoundCloudPlugin(), new SpotifyPlugin(), new YtDlpPlugin() ],
    })

    start() {

        const token = process.env.token
        const db = process.env.mongoDbUrl

        this.login(token)
            .then(() => {

                if (!db) return

                mongoose.set("strictQuery", false)
                mongoose.connect(db)
                    .then(data => {

                        console.log(`Connected to: ${data.connection.name}`)

                    }).catch(err => console.log(err))

            }).catch(err => console.log(err))

    }

}

module.exports = { CustomClient }