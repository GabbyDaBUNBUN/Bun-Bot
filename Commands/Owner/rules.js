const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rules")
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
        
        3. Respect the decision of staff. If you wish to contest a warn or ban you are requested to <#1037971276272242688> or message another mod. Don't fight them in public channels.
        
        4. No spamming, flooding the chat, shitposting, or sending large walls of text into any of the channels. Links, memes, selfies, tiktoks etc go in <#1074287091074207845> .
        
        5. Any and all self-promotion must go through staff. NO EXCEPTIONS!
        
        6. Please keep adult talk (NO NSFW chat of any kind, this is an SFW server) and cussing out of <#1037960777136607302> at all times.
        
        7. Cussing and all Triggering topics must be spoilered/censord when used in the server!
        
        8. Please respect peoples' roles - they are there for a reason. That means if they have No Flirting/No Touch/No DMs, then respect that. Do not give anyone a nickname/petname without getting consent first!
        
        9. Please use the proper channels, they are labeled the way they are for a reason. If you have any questions then refer to <#1040093933675487232>.
        
        10. This is a server for littles that want to regress, but we do not cater to ageplay rp here. If you want to find a place specifically for that, please find a server that better serves your needs.
        
        11. We are not a dating server. Some people have the <@&1080517195412541460> role and you may request these people when you need someone to take care of you, but we want our server to continue to be a safe, warm, and little space.
        
        12. Please keep talk about politics/violence/self harm to a minimum. Some people can be triggered by such topics.
        
        12. No attention-seeking (eg. roleplaying self-harm, asking to be taken care of by people without the <@&1080517195412541460> role, ...). Staff will give you a verbal warning first if they think your behavior is inappropriate, and an official one will follow if you continue.
        
        13. If you as a member feel uncomfortable or threatened around another member, please <#1037971276272242688>. We will resolve the situation for you and never think you are bugging us or wasting our time.
        
        14. We have a punishment protocol. For all rules that don't specify a punishment explicitly they are as follows:
        Warn X3
        Ban
        
        Exception:
        (Staff reserves the right to ban any member at any time if staff feels the members actions threaten other members or the server itself.)
        
        15. Please follow Discord TOS. (not doing so will result in a ban)` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor("0xffc0cb")
            .setTitle(`Rules`)
            .setDescription(`${desc}`)
            .setImage(`https://ucarecdn.com/87c4ca9b-a3af-4756-aaff-9124049f8278/Rules.jpg`)
            .setFooter({ text: "Server Map by Bun Bot" })
            .setTimestamp();

        interaction.reply({ embeds: [ Embed ] });

    }
}