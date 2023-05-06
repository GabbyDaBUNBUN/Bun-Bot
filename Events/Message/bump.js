const { Message, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const EconomyDB = require("../../Structures/Schemas/EconomyDB")

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { author, channel, interaction, guild } = message
        const bot = author.id
        const { color } = client
        const sleep = async (ms) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, ms || 0);
            });
        };
        if (bot !== `302050872383242240`) return
        if (guild.id !== `1037958833529696276`) return

        const member = interaction.user.id

        EconomyDB.findOne({ Guild: guild.id }, async (err, data) => {
            if (err) throw err

            if (!data) {
                EconomyDB.create({
                    Guild: guild.id,
                    User: member,
                    Balance: 0,
                    Inventory: [],
                })
            }
        })

        //Disboard Bump Buddy
        message.react(`⏲️`)

        await sleep(500)

        let econData = await EconomyDB.findOne({ Guild: guild.id, User: member }).catch(err => { })

        econData.Balance = econData.Balance + 10
        await econData.save()

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(color)
                    .setTitle("Bumped!")
                    .setDescription("Thank you for bumping our server! You have been awarded 10 🪙's! We will remind you when to bump again!")
                    .setFooter({ text: "Bump Buddy by Bun Bot" })
                    .setTimestamp()
            ]
        }).then(async () => {
            await sleep(7200000)

            channel.send({
                content: `<@${member}> <@&1042275026616983654>`,
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle("Time to Bump!")
                        .setDescription(`Help us get new members! Use \`/bump\` to bump the server!`)
                        .setFooter({ text: "Bump Buddy by Bun Bot" })
                        .setTimestamp()
                ]
            })
        })

    }

}