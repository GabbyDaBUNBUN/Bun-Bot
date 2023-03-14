const { Events, ButtonInteraction, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const PollDB = require("../../Structures/Schemas/PollDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    name: Events.InteractionCreate,

    /**
     * @param { ButtonInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { customId, user, message, guild } = interaction
        const { emojilist, color } = client

        if (!interaction.isButton()) return

        const splittedArray = customId.split(`-`)
        if (splittedArray[ 0 ] !== "Poll") return

        let data = await PollDB.findOne({ Guild: guild.id, User: user.id, Message: message.id }).catch(err => { })

        if (!data) {

            const pollEmbed = message.embeds[ 0 ]
            if (!pollEmbed) return Reply(interaction, emojilist.cross, `Unable to find poll embed!`, true)

            const yesField = pollEmbed.fields[ 0 ]
            const noField = pollEmbed.fields[ 1 ]

            switch (splittedArray[ 1 ]) {

                case "Yes": {

                    const newYesCount = parseInt(yesField.value) + 1
                    yesField.value = newYesCount

                    data = new PollDB({
                        Guild: guild.id,
                        User: user.id,
                        Message: message.id,
                    })
                    await data.save()

                    Reply(interaction, emojilist.tick, `Your vote has been counted!`, true)
                    message.edit({ embeds: [ pollEmbed ] })

                }

                    break;

                case "No": {

                    const newNoCount = parseInt(noField.value) + 1
                    noField.value = newNoCount

                    data = new PollDB({
                        Guild: guild.id,
                        User: user.id,
                        Message: message.id,
                    })
                    await data.save()

                    Reply(interaction, emojilist.tick, `Your vote has been counted!`, true)
                    message.edit({ embeds: [ pollEmbed ] })

                }

                    break;

            }

        } else {

            const Member = guild.members.cache.get(user.id)
            if (splittedArray[ 1 ] === `End`) {
                if (Member.roles.highest.permissions.has(PermissionFlagsBits.Administrator)) return Reply(interaction, emojilist.cross, `You do not have permission to end the poll!`, true)

                const pollEmbed = message.embeds[ 0 ]
                if (!pollEmbed) return Reply(interaction, emojilist.cross, `Unable to find poll embed!`, true)

                const yesField = pollEmbed.fields[ 0 ]
                const noField = pollEmbed.fields[ 1 ]

                const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle("Poll Ended")
                    .setDescription(`These are the poll results:\n\n${pollEmbed.description}`)
                    .setFields(
                        {
                            name: `${yesField.name}`,
                            value: `${yesField.value}`,
                            inline: true,
                        },
                        {
                            name: `${noField.name}`,
                            value: `${noField.value}`,
                            inline: true,
                        },
                    )
                    .setFooter({ text: "Poll by Bun Bot" })
                    .setTimestamp()

                PollDB.deleteMany({ Guild: guild.id, Message: message.id }).catch(err => { })

                message.edit({ embeds: [ Embed ], components: [] })
            } else {
                return Reply(interaction, emojilist.cross, `You have already voted!`, true)
            }

        }

    }
}