const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vc-rules")
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

        const desc = [ `1. Please keep in mind that the SFW nature of the server extends to VC as well. Please keep any talk in VC SFW. 

        2. Please keep adult talk (NO NSFW chat of any kind, this is an SFW server) and cussing out of <#1037958834053976087> at all times.

        3. If you are wanting to talk about a topic that is SFW but could still be considered sensitive, make sure to ask people in VC whether they are okay with talking about it first. Tickets from people who were made uncomfortable in VC will be treated the same as if it had happened in text, and you may receive a warning just the same.
        
        4. Mute yourself if need be. If you have to leave the conversation for a bit and there might be loud noises or other people talking about uncomfortable topics in the background, mute yourself. Kids running around or a tv playing is one thing, loud yelling or people talking about NSFW topics is considered another. If you're unsure, err on the side of caution!
        
        5. Keep an eye on <#1038997540793761833> while you're talking. We use a redlight system where people can easily indicate when they are less or not at all comfortable with the current line of conversation by posting in this channel. To everyone who is uncomfortable, use this system please! 
        
        💚  All is good
        💛  Getting uncomfortable
        ❤️  Stop immediately 
        ` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor(color)
            .setTitle(`Rules`)
            .setDescription(`${desc}`)
            .setImage(`https://ucarecdn.com/87c4ca9b-a3af-4756-aaff-9124049f8278/Rules.jpg`)
            .setFooter({ text: "Rules by Bun Bot" })
            .setTimestamp();

        interaction.reply({ embeds: [ Embed ] });

    }
}