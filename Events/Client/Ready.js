const { Events, ActivityType, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const { loadCommands } = require("../../Structures/Functions/CommandLoader")
const QotdDB = require("../../Structures/Schemas/QotdDB")
const Questions = require("../../Questions.json")
const cron = require("node-cron")
const ms = require("ms")

module.exports = {
    name: Events.ClientReady,

    /**
     * 
     * @param {CustomClient} client 
     */
    async execute(client) {

        const { user, color } = client

        //Command Loader
        loadCommands(client)


        //Bot Login
        console.log(`${user.tag} is online!`)


        //Bot Status
        setInterval(() => {

            user.setActivity({
                name: `/help for command list`,
                type: ActivityType.Playing
            })

        }, ms("5s"))


        //QOTD 
        let Guilds = client.guilds.cache.map(guild => guild.id)
        Guilds.forEach(async guild => {

            const data = await QotdDB.findOne({ Guild: guild }).catch(err => { })
            if (!data) return
            if (data.Channel) {

                cron.schedule(`0 8 * * *`, () => {

                    const channel = client.channels.cache.get(data.Channel)
                    if (data.Count >= Questions.length) {
                        data.Count = 0
                    }
                    const randomQuestion = Questions[ data.Count ]

                    const Embed = new EmbedBuilder()
                        .setColor(color)
                        .setTitle("QOTD")
                        .setDescription(`${randomQuestion}`)
                        .setFooter({ text: "QOTD by Bun Bot" })

                    channel.send({ content: `${data.Role}`, embeds: [ Embed ] })
                    data.Count = data.Count + 1
                    data.save()
                }, {
                    scheduled: true,
                    timezone: "America/Chicago"
                })

            }

        })

        //Distube Event Listeners
        const status = queue =>
            `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
            }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
        client.distube
            .on('playSong', (queue, song) =>
                queue.textChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Play Song")
                            .setDescription(`▶️ | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
                            .setFooter({ text: `Music by Bun Bot` })
                            .setTimestamp()
                    ]
                })
            )
            .on('addSong', (queue, song) =>
                queue.textChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Add Song")
                            .setDescription(`✅ | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
                            .setFooter({ text: `Music by Bun Bot` })
                            .setTimestamp()
                    ]
                })
            )
            .on('addList', (queue, playlist) =>
                queue.textChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Add List")
                            .setDescription(`✅ | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
                            .setFooter({ text: `Music by Bun Bot` })
                            .setTimestamp()
                    ]
                })
            )
            .on('error', (channel, e) => {
                if (channel) channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Error")
                            .setDescription(`❌ | An error encountered: ${e.toString().slice(0, 1974)}`)
                            .setFooter({ text: `Music by Bun Bot` })
                            .setTimestamp()
                    ]
                })
                else console.error(e)
            })
            .on('empty', (queue) => {
                queue.textChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Empty")
                            .setDescription(`Voice channel is empty! Leaving the channel...`)
                            .setFooter({ text: `Music by Bun Bot` })
                            .setTimestamp()
                    ]
                })
            })
            .on('searchNoResult', (interaction, query) =>
                interaction.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle("No Results")
                            .setDescription(`❌ | No result found for \`${query}\`!`)
                            .setFooter({ text: `Music by Bun Bot` })
                            .setTimestamp()
                    ]
                })
            )
            .on('finish', queue => queue.textChannel.send('Finished!'))

    }
}