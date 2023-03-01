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

        const desc = [ `1. You must ID verify to join this server, only 18+ will be admitted.

2. No forms of discrimination based on gender, race, religion, etc will be tolerated whatsoever.

3. Respect the decision of staff. If you wish to contest a warn or ban you are requested to <#1037971276272242688>  or message another mod. Don't fight them in public channels.

4. No spamming, flooding the chat, shitposting, or sending large walls of text into any of the channels. Links, memes, selfies, tiktoks etc go in <#1074287091074207845> .

5. Any and all self-promotion must go through staff. NO EXCEPTIONS!

6. Please keep adult talk (NO NSFW chat of any kind, this is an SFW server) and cussing to <#1037958834053976086> at all times.

7. Please respect peoples' roles - they are there for a reason. That means if they have No Flirting/No Touch/No DMs, then respect that. Do not give anyone a nickname/petname without getting consent first!

8. Please use the proper channels, they are labeled the way they are for a reason. If you have any questions then refer to <#1040093933675487232>.

9. We are not a dating server. Some people have the <@&1080517195412541460> role and you may request these people when you need someone to take care of you, but we want our server to continue to be a safe, warm, and little space.

10. Please keep talk about politics/violence/self harm to a minimum. Some people can be triggered by such topics.

11. No attention-seeking (eg. roleplaying self-harm, asking to be taken care of by people without the @babysitter role, ...). Staff will give you a verbal warning first if they think your behavior is inappropriate, and an official one will follow if you continue. 

12. We have a punishment protocol. For all rules that don't specify a punishment explicitly they are as follows:
Warn X3
Ban

13.Please follow Discord TOS. (not doing so will result in a ban)` ]

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