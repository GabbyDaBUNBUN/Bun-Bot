const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("little-rules")
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

        const desc = [ `✨1. Please Ask Consent from Babysitters to babysit - don’t try to get their attention to take care of you when they are with another little

        ✨2. Please try contacting your CG before going into Daycare as Daycare works just how a IRL one does - there for when your CG cannot take care of you OR if your CG wants to do it in the daycare that’s fine to
        
        ✨3. Do not brat without consent 
        
        ✨4. Always be nice to other littles 
        
        ✨5. No NSFW topics or media in Sunflower Fields
        
        ✨6. No sexualizing Littlespace 
        
        ✨7. No stealing attention, or being rude because you aren’t getting the attention you want` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor(color)
            .setTitle(`Custom Chat Room Rules`)
            .setDescription(`${desc}`)
            .setFooter({ text: "Rules by Bun Bot" })
            .setTimestamp();

        interaction.reply({
            embeds: [ Embed ],
        });

    }
}