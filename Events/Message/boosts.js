const { Message, EmbedBuilder, Events } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    name: Events.MessageCreate,

    /**
     * @param { Message } message
     * @param { CustomClient } client
     */
    async execute(message, client) {

        const { guild, author, type } = message
        const { color } = client

        const Guild = `1037958833529696276`

        const boosts = [ `8`, `9`, `10`, `11` ]
        if (!guild || guild.id !== Guild || !boosts.includes(type) || author.bot) return

        if (boosts.includes(type)) {

            message.reply({
                content: `${author}`,
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setTitle("New Booster")
                        .setDescription(`Thank you ${author} for boosting!!! We are up to ${guild.premiumSubscriptionCount} boosts!!! You get some awesome rewards for doing so!!! You will receive a custom role, as well as a custom chat room!!! Please <#1037971276272242688> and let us know what you would like for your role name, color (in hex), and emoji (Must be from this server). We will also need to know what you want the name of your Custom Chat Room to be!!`)
                        .setImage(`https://ucarecdn.com/b8f01ed8-11c0-48b3-83c5-3dec4734adc4/b1e248b66c17a7da87cdf29e24b38e34.jpg`)
                        .setFooter({ text: "Boosts by Bun Bot" })
                        .setTimestamp()
                ]
            })

        }

    }
}