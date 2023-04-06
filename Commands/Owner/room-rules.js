const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("room-rules")
        .setDescription("Sends the manual embed. (Owner only)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { user, member } = interaction
        const { emojilist, color } = client

        if (user.id !== `806050057811132436`) return Reply(interaction, emojilist.cross, "You do not have access to this command!", true)

        const desc = [ `Anything mentioned in rooms has to abide by our <#1089010680486711366>. 

        You may vent in your room, but they may not include heavy or triggering topics. Triggering vents will only ever be allowed in <#1039199877432877106>. 
        
        When lightly venting in your room, you have to censor your vent.
        
        Do not post creepy/disturbing images in your channel as they may make others uncomfortable.
        
        You may joke with friends in your room, but remember that others can see what you're posting. So make sure that all topics are appropriate and don't be overly aggressive to friends, even if playful.
        
        Swearing still needs to be censored, just like in every other channel. Swears can never be directed towards another user, even if playful.
        
        You are allowed to talk about socially acceptable drinking (only) within your own room without censoring it. Please use the appropriate terminology to refer to such behavior and substances though, as listed in <#1087841185319636993>.
        
        ---
        General Information: 

        You may share your room with anyone you please!

        When boosting, rooms will only be kept for the duration that you boost the server. When you stop boosting the server, you have to purchase 'Custom Chat-Room Monthly Rent' in <#1074284326251933716> in order to keep your room. If not, Staff will ping you a reminder to either re-Boost or purchase Room Rent. Your room may be deleted if you don't do either of these things.

        When purchasing a room with coins in our <#1074284326251933716>, you have to purchase 'Custom Chat-Room Monthly Rent' every month following your room's original purchase date to keep it active. Otherwise, same as stated above.` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor(color)
            .setTitle(`Custom Chat Room Rules`)
            .setDescription(`${desc}`)
            .setFooter({ text: "Server Map by Bun Bot" })
            .setTimestamp();

        interaction.reply({
            embeds: [ Embed ],
        });

    }
}