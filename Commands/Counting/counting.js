const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const CountingDB = require("../../Structures/Schemas/CountingDB")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("counting")
        .setDescription("Counting commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommand(sub => sub.setName("reset")
            .setDescription("Reset the count back to 0."))
        .addSubcommand(sub => sub.setName("save")
            .setDescription("Resets the count back to x number.")
            .addNumberOption(opt => opt.setName("number").setDescription("The number you want it reset to.").setRequired(true)))
        .addSubcommand(sub => sub.setName("set-up")
            .setDescription("Set up your counting command needs.")
            .addChannelOption(opt => opt.setName("channel").setDescription("Channel you want the counting to be in.").setRequired(true).addChannelTypes(ChannelType.GuildText))
            .addRoleOption(opt => opt.setName("role").setDescription("Role you want given to the user when they mess up.").setRequired(true))),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {CustomClient} client 
     */

    async execute(interaction, client) {

        const { options, user, member, guild } = interaction
        const { emojilist, color } = client

        switch (options.getSubcommand()) {

            case "reset": {

                const data = await CountingDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!data) return

                data.HighScore = 0
                await data.save()

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(color)
                            .setTitle(`Counting Reset`)
                            .setDescription(`You have reset the count! Your count will now begin at \`1\`!`)
                            .setFooter({ text: "Counting by Bun Bot" })
                            .setTimestamp()
                    ]
                })

            }

            case "save": {

                const number = options.getNumber("number")

                const data = await CountingDB.findOne({ Guild: guild.id })
                if (!data) return

                data.Count = number
                await data.save()

                let newNumber = number + 1

                const Embed = new EmbedBuilder()
                    .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
                    .setColor(color)
                    .setTitle(`Counting Save`)
                    .setDescription(`You have saved the count! Your count will now begin at ${newNumber}!`)
                    .setFooter({ text: "Counting by Bun Bot" })
                    .setTimestamp();

                interaction.reply({ embeds: [ Embed ] })

            }

                break;

            case "set-up": {

                const channel = options.getChannel("channel")
                const rawRole = options.getRole("role")
                const role = rawRole.id

                let data = await CountingDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) {

                    data.Channel = channel
                    data.Role = role
                    data.save()

                } else if (!data) {

                    data = new CountingDB({
                        Guild: guild.id,
                        Channel: channel,
                        Role: role,
                    })

                    await data.save()

                }

                Reply(interaction, emojilist.tick, `Your counting setup info has been saved!`)

            }

                break;

        }

    }

}