const { Message, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CharactersDB = require("../../Structures/Schemas/CharactersDB")

module.exports = {
    name: Events.MessageUpdate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { guild, author, channel, reactions } = message
        const sleep = async (ms) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, ms || 0);
            });
        };

        if (message.webhookId) return

        const content = reactions.message.content
        const split = content.split(` `)
        const proxy = split[ 0 ]
        const Message = content.split(` `).slice(1).join(` `)

        const data = await CharactersDB.findOne({ GuildID: guild.id, MemberID: reactions.message.author.id, Proxy: proxy }).catch(err => { })
        if (!data) return

        const webhook = await channel.createWebhook({ name: data.Name, avatar: data.Avatar }).catch(err => { })

        try {
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.find(wh => wh.token);

            if (!webhook) {
                return console.log('No webhook was found that I can use!');
            }

            await webhook.send({
                content: Message,
                username: data.Name,
                avatarURL: data.Avatar,
            });
        } catch (error) {
            console.error('Error trying to send a message: ', error);
        }

        await sleep(500)

        message.delete()

        await webhook.delete()

    }

}