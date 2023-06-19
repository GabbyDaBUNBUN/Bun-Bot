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

            const optionField1 = pollEmbed.fields[ 0 ]
            const optionField2 = pollEmbed.fields[ 1 ]
            const optionField3 = pollEmbed.fields[ 2 ]
            const optionField4 = pollEmbed.fields[ 3 ]

            switch (splittedArray[ 1 ]) {

                case "Option1": {

                    const newOption1Count = parseInt(optionField1.value) + 1
                    optionField1.value = newOption1Count

                    data = new PollDB({
                        Guild: guild.id,
                        User: user.id,
                        Message: message.id,
                        Answer: splittedArray[ 2 ]
                    })
                    await data.save()

                    Reply(interaction, emojilist.tick, `Your vote has been counted!`, true)
                    message.edit({ embeds: [ pollEmbed ] })

                }

                    break;

                case "Option2": {

                    const newOption2Count = parseInt(optionField2.value) + 1
                    optionField2.value = newOption2Count

                    data = new PollDB({
                        Guild: guild.id,
                        User: user.id,
                        Message: message.id,
                        Answer: splittedArray[ 2 ]
                    })
                    await data.save()

                    Reply(interaction, emojilist.tick, `Your vote has been counted!`, true)
                    message.edit({ embeds: [ pollEmbed ] })

                }

                    break;

                case "Option3": {

                    const newOption3Count = parseInt(optionField3.value) + 1
                    optionField3.value = newOption3Count

                    data = new PollDB({
                        Guild: guild.id,
                        User: user.id,
                        Message: message.id,
                        Answer: splittedArray[ 2 ]
                    })
                    await data.save()

                    Reply(interaction, emojilist.tick, `Your vote has been counted!`, true)
                    message.edit({ embeds: [ pollEmbed ] })

                }

                    break;

                case "Option4": {

                    const newOption4Count = parseInt(optionField4.value) + 1
                    optionField4.value = newOption4Count

                    data = new PollDB({
                        Guild: guild.id,
                        User: user.id,
                        Message: message.id,
                        Answer: splittedArray[ 2 ]
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

                const optionField1 = pollEmbed.fields[ 0 ]
                const optionField2 = pollEmbed.fields[ 1 ]
                const optionField3 = pollEmbed.fields[ 2 ]
                const optionField4 = pollEmbed.fields[ 3 ]

                const pollData = await PollDB.find({ Guild: guild.id, Message: message.id }).catch(err => { })
                const answers = []
                pollData.forEach(data => {
                    answers.push(`**User:** <@${data.User}> **Answer:** ${data.Answer}`)
                });

                const desc = [ `**User Answers:**
                
                ${answers}` ]

                const Embed = new EmbedBuilder()
                    .setColor(color)
                    .setTitle("Poll Ended")
                    .setDescription(`${desc}`)
                    .setFields(
                        {
                            name: `${optionField1.name}`,
                            value: `${optionField1.value}`,
                            inline: true,
                        },
                        {
                            name: `${optionField2.name}`,
                            value: `${optionField2.value}`,
                            inline: true,
                        },
                        {
                            name: `${optionField3.name}`,
                            value: `${optionField3.value}`,
                            inline: true,
                        },
                        {
                            name: `${optionField4.name}`,
                            value: `${optionField4.value}`,
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