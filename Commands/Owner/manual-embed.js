const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("manual-embed")
        .setDescription("Sends the manual embed. (Owner only)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { user, member } = interaction
        const { emojilist } = client

        if (user.id !== `806050057811132436`) return Reply(interaction, emojilist.cross, "You do not have access to this command!", true)

        const desc = [ `1. You must ID verify to join this server, only 18+ will be admitted\n
        2.Any and all forms of discrimination based on gender, race, religion, etc will not be tolerated\n
        3.Respect the decision of staff. If you wish to contest a warn or ban you are requested to <#1037971276272242688> or message another mod. Don't fight them in public channels\n
        4.No spamming, flooding the chat, shitposting, or sending large walls of text into any of the channels. Links, memes, selfies, tiktoks etc go in <#1037959430957969438>\n
        5.Any and all self-promotion must go through the server owner. NO EXCEPTIONS!\n
        6.Please keep adult talk (NO NSFW chat of any kind, this is an SFW server) and cussing to the <#1037958834053976086> chat at all times.\n
        7.Please respect peoples roles they are there for a reason. That means if they have No Flirting/No Touch/No DMs, then respect that. Do not give anyone a nickname/petname without getting consent first!\n
        8.Please use the proper channels, they are labeled in a way for a reason. If you have any questions then refer to the <#1040093933675487232>.\n
        9.Please keep talk about politics/violence/self harm to a minimum. Some people can be triggered by such topics.\n
        10.We have a punishment protocol. For all rules that don't specify a punishment explicitly they are as follows:\n Warn x3\n Ban\n\n
        11.Please follow Discord TOS. (not doing so will result in a ban)\n` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor("0xffc0cb")
            .setTitle(`Rules:`)
            .setDescription(`${desc}`)
            .setFooter({ text: "Sent by Bun Bot" })
            .setTimestamp();

        interaction.reply({ embeds: [ Embed ] });

    }
}