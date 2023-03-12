const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mod-help")
        .setDescription("Sends a list of the moderation bot commands.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { color } = client

        const Commands = [ `clear\ncounting-save\nmod-help` ]
        const Currency = [ `modify-bal-add\nmodify-bal-remove\nshop-add\nshop-remove\nmodify-inv-add\nmodify-inv-remove\npick-channel` ]
        const Embeds = [ `create\nsend\nlist\ndelete` ]
        const Reactions = [ `add-role\nremove-role\npanel` ]
        const SetUp = [ `confession-setup\ncounting-setup\ncreate-vc-setup\nlevels-setup\nqotd-setup\nsafe-word-setup` ]
        const Ticket = [ `embed\nlog-channel` ]
        const Warn = [ `log-channel\nmember\ninfo` ]

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Help")
            .setDescription("List of all the commands available at this time:")
            .setFields(
                {
                    name: "Commands:",
                    value: `${Commands}`,
                    inline: true,
                },
                {
                    name: "Currency:",
                    value: `${Currency}`,
                    inline: true,
                },
                {
                    name: "Embed:",
                    value: `${Embeds}`,
                    inline: true,
                },
                {
                    name: "Reaction-Roles:",
                    value: `${Reactions}`,
                    inline: true,
                },
                {
                    name: "Set Up:",
                    value: `${SetUp}`,
                    inline: true,
                },
                {
                    name: "Warn:",
                    value: `${Warn}`,
                    inline: true,
                },
            )
            .setFooter({ text: "/mod-help by Bun Bot" })
            .setTimestamp()

        interaction.reply({ embeds: [ Embed ] })

    }
}