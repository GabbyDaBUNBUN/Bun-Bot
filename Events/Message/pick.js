const { Message, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const PickDB = require("../../Structures/Schemas/PickDB")

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { guild } = message
        const { color } = client
        const sleep = async (ms) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, ms || 0);
            });
        };

        PickDB.findOne({ Guild: guild.id }, async (err, data) => {

            if (err) throw err

            if (!data) {

                PickDB.create({
                    Guild: guild.id,
                    OpenWindow: false,
                    MessageCount: 0,
                })

            }

        })

        await sleep(500)

        let pickData = await PickDB.findOne({ Guild: guild.id }).catch(err => { })

        let messageCount = pickData.MessageCount
        let pickCount = 30

        messageCount = messageCount + 1
        await pickData.save()

        if (count === pickCount) {

            let pickData = await PickDB.findOne({ Guild: guild.id }).catch(err => { })

            const Embed = new EmbedBuilder()
                .setColor(color)
                .setTitle("Pick!")
                .setDescription(`Someone has dropped 🪙's! Pick them up by using \`/pick\`!`)
                .setFooter({ text: "Pick by Bun Bot" })
                .setTimestamp()

            message.reply({ embeds: [ Embed ] }).then(msg => {
                setTimeout(() => msg.delete(), 10000)
            }).catch(err => { })

            pickData.OpenWindow = true
            await pickData.save()

            await sleep(10000)
            pickData.OpenWindow = false
            await pickData.save()

        }

    }
}