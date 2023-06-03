const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("create-vc")
        .setDescription("Customize your channel.")
        .addSubcommand(sub => sub.setName("name")
            .setDescription("What you want your channel name to be.")
            .addStringOption(opt => opt.setName("name").setDescription("The name you want your channel to be.").setRequired(true)))
        .addSubcommand(sub => sub.setName("private")
            .setDescription("Set your channel to only allow invited members.")
            .addBooleanOption(opt => opt.setName("invite-only").setDescription("If you want your channel to be private or not.").setRequired(true)))
        .addSubcommand(sub => sub.setName("invite")
            .setDescription("Member you want to invite to your channel.")
            .addUserOption(opt => opt.setName("member").setDescription("Member you want to invite to your channel.").setRequired(true))),
    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { options, user, member, guild } = interaction
        const { emojilist, voiceCollection } = client
        const voiceChannel = member.voice.channel
        if (!voiceChannel) return Reply(interaction, emojilist.cross, `You must be in a vc first!`)
        const ownedChannelId = voiceCollection.get(member.id)
        const ownedChannel = guild.channels.cache.get(ownedChannelId)
        const ownedTextChannelId = voiceCollection.get(member.user.username)
        const ownedTextChannel = guild.channels.cache.get(ownedTextChannelId)
        if (!ownedChannelId || voiceChannel.id !== ownedChannelId) return Reply(interaction, emojilist.cross, `You are not the owner of this vc!`)


        switch (options.getSubcommand()) {

            case "name": {

                await interaction.deferReply({ ephemeral: true });
                const name = options.getString("name")
                if (name.length > 22 || name.length < 1) Reply(interaction, emojilist.cross, `The name cannot exceed the 22 character limit!`)
                ownedChannel.setName(name)
                ownedTextChannel.setName(name)
                return Reply(interaction, emojilist.tick, `Your Channel names have been changed!`)

            }

                break;

            case "private": {

                await interaction.deferReply({ ephemeral: true });
                const private = options.getBoolean("invite-only")

                if (private === true) {
                    ownedChannel.edit({
                        permissionOverwrites: [
                            {
                                id: member.id,
                                allow: [ "Connect", "ManageChannels" ],
                            },
                            {
                                id: guild.id,
                                deny: [ "Connect" ],
                            },
                        ]
                    })
                    ownedTextChannel.edit({
                        permissionOverwrites: [
                            {
                                id: member.id,
                                allow: [ "SendMessages", "EmbedLinks", "UseExternalEmojis", "AttachFiles", "UseApplicationCommands", "AddReactions", "ViewChannel" ],
                            },
                            {
                                id: guild.id,
                                deny: [ "ViewChannel" ],
                            },
                        ]
                    })
                } else {
                    ownedChannel.edit({
                        permissionOverwrites: [
                            {
                                id: member.id,
                                allow: [ "Connect", "ManageChannels" ],
                            },
                            {
                                id: guild.id,
                                allow: [ "Connect" ],
                            },
                        ]
                    })
                    ownedTextChannel.edit({
                        permissionOverwrites: [
                            {
                                id: member.id,
                                allow: [ "SendMessages", "EmbedLinks", "UseExternalEmojis", "AttachFiles", "UseApplicationCommands", "AddReactions", "ViewChannel" ],
                            },
                            {
                                id: guild.id,
                                deny: [ "SendMessages", "EmbedLinks", "UseExternalEmojis", "AttachFiles", "UseApplicationCommands", "AddReactions", "ViewChannel" ],
                            },
                        ]
                    })
                }

                return Reply(interaction, emojilist.tick, `Your changes have been saved!`)

            }

                break;

            case "invite": {

                await interaction.deferReply({ ephemeral: true });
                const targetMember = options.getUser("member")
                ownedChannel.permissionOverwrites.edit(targetMember, { Connect: true })
                ownedTextChannel.permissionOverwrites.edit(targetMember, { ViewChannel: true, SendMessages: true, EmbedLinks: true, UseExternalEmojis: true, AttachFiles: true, UseApplicationCommands: true, AddReactions: true })
                return Reply(interaction, emojilist.tick, `${member} has invited ${targetMember} to <#${ownedChannel.id}>`)

            }

        }

    }
}