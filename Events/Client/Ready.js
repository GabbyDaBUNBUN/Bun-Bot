const { Events, ActivityType, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const { loadCommands } = require("../../Structures/Functions/CommandLoader")
const QotdDB = require("../../Structures/Schemas/QotdDB")
const Questions = require("../../Questions.json")
const cron = require("node-cron")
const ms = require("ms")

count = 0

module.exports = {
    name: Events.ClientReady,

    /**
     * 
     * @param {CustomClient} client 
     */
    execute(client) {

        const { user, guilds } = client

        //Command Loader
        loadCommands(client)


        //Bot Login
        console.log(`${user.tag} is online!`)


        //Bot Status
        setInterval(() => {

            user.setActivity({
                name: `/help for a list of commands`,
                type: ActivityType.Listening
            })

        }, ms("5s"))


        //QOTD 
        let Guilds = client.guilds.cache.map(guild => guild.id)
        Guilds.forEach(async guild => {

            const data = await QotdDB.findOne({ Guild: guild }).catch(err => { })
            if (!data) return
            const Guild = guilds.cache.get(data.Guild)

            cron.schedule(`0 8 * * *`, () => {

                const channel = Guild.channels.cache.get(data.Channel)
                if (count >= Questions.length) {
                    count = 0
                }
                const randomQuestion = Questions[ count ]

                const Embed = new EmbedBuilder()
                    .setColor("0xffc0cb")
                    .setTitle("QOTD")
                    .setDescription(`${randomQuestion}`)
                    .setFooter({ text: "QOTD by Bun Bot" })

                channel.send({ content: `${data.Role}`, embeds: [ Embed ] })
                count++
            }, {
                scheduled: true,
                timezone: "America/Chicago"
            })

        })

    }
}