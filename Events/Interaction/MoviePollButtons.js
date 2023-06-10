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
        if (splittedArray[ 0 ] !== "MoviePoll") return

        let data = await PollDB.findOne({ Guild: guild.id, User: user.id, Message: message.id }).catch(err => { })

        if (!data) {

            const pollEmbed = message.embeds[ 0 ]
            if (!pollEmbed) return Reply(interaction, emojilist.cross, `Unable to find poll embed!`, true)

            const movieField1 = pollEmbed.fields[ 0 ]
            const movieField2 = pollEmbed.fields[ 1 ]
            const movieField3 = pollEmbed.fields[ 2 ]
            const movieField4 = pollEmbed.fields[ 3 ]

            switch (splittedArray[ 1 ]) {

                case "Movie1": {

                    const newMovie1Count = parseInt(movieField1.value) + 1
                    movieField1.value = newMovie1Count

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

                case "Movie2": {

                    const newMovie2Count = parseInt(movieField2.value) + 1
                    movieField2.value = newMovie2Count

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

                case "Movie3": {

                    const newMovie3Count = parseInt(movieField3.value) + 1
                    movieField3.value = newMovie3Count

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

                case "Movie4": {

                    const newMovie4Count = parseInt(movieField4.value) + 1
                    movieField4.value = newMovie4Count

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
                if (!Member.roles.highest.permissions.has(PermissionFlagsBits.Administrator)) return Reply(interaction, emojilist.cross, `You do not have permission to end the poll!`, true)

                const pollEmbed = message.embeds[ 0 ]
                if (!pollEmbed) return Reply(interaction, emojilist.cross, `Unable to find poll embed!`, true)

                const movieField1 = pollEmbed.fields[ 0 ]
                const movieField2 = pollEmbed.fields[ 1 ]
                const movieField3 = pollEmbed.fields[ 2 ]
                const movieField4 = pollEmbed.fields[ 3 ]

                const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle("Poll Ended")
                    .setDescription(`${pollEmbed.description}`)
                    .setFields(
                        {
                            name: `${movieField1.name}`,
                            value: `${movieField1.value}`,
                            inline: true,
                        },
                        {
                            name: `${movieField2.name}`,
                            value: `${movieField2.value}`,
                            inline: true,
                        },
                        {
                            name: `${movieField3.name}`,
                            value: `${movieField3.value}`,
                            inline: true,
                        },
                        {
                            name: `${movieField4.name}`,
                            value: `${movieField4.value}`,
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