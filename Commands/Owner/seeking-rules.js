const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("seeking-rules")
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

        const desc = [ `This is the seeking area of the server. It's a place to meet people and find a relationship in a friendly manner. Since we want to keep it friendly, there's a few rules that are important if you want to make use of this area.
        
        ✨1. Respect the server rules. NSFW content, however slight, does not belong on this server.

        ✨2. Respect people's consent rules. Even with this being a seeking area, unless someone has given you explicit permission to flirt/touch/DM or list differently in their seeking post, do not do any of those things. 
        
        ✨3. If anything goes sour for you, whether it's rejection or a break-up, please keep any related negativity out of the server. Failure to do so will be treated the same as attention-seeking behavior and will result in warnings.
        
        ✨4. We are not here to provide assistance in relationships. If you feel there are issues that need handling, please reach out to someone who can help you better than we can. If you open a ticket, we will of course help you if you need help finding someone like that. 
        
        ✨5.  If you run into any issues that you feel need to be brought to staff attention, please open a ticket in #tickets. We are here to keep everyone on the server safe, and you can help us do that by letting us know about Bad Things (||toxicity, manipulation, abuse, and others||). You will **NEVER** waste our time by doing so.` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor(color)
            .setTitle(`Seeking Rules`)
            .setDescription(`${desc}`)
            .setFooter({ text: "Rules by Bun Bot" })
            .setTimestamp();

        interaction.reply({
            embeds: [ Embed ],
        });

    }
}