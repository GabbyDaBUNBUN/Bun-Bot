const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("triggers")
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

        const desc = [ `Spoiler Topics:

        *these are thing/topics you put in | | spoilers (you must put a trigger warning in front of spoilered subjects eg. TW: cursing ||fuck||)
        
        ► ||cursing|| 
        ► ||religion||
        ► ||medical stuff  ex hospitalizations/surgery/blood||
        ► ||yelling/all caps||
        ► ||bugs / insects and reptiles||
        ► ||Flashing emojis or gif for health reasons||
        ► ||fire or talking about things burning||
        ► ||padded pics||
        ► ||cheating||
        ► If you want to talk about ||alcohol|| or ||weed|| we ask that you use \`spicy juice\` for ||alcohol|| \`loopy\` for ||drunk|| and \`spicy grass\` for ||weed||
        
        
        Banned Subjects:
        
        ► ||violence ( death/killing, blood)||
        ► ||weapons|| 
        ► ||substance abuse (alcohol/drugs)||
        ► ||pedophilia|| 
        ► ||politics|| 
        ► ||sexualizing dd/lg age regression||
        ► ||kinks/age play||
        ► ||Eating disorders||
        ► ||Suicide/Self Harm  Anything to do with this including thoughts|| (If you need to talk to someone our staff is always available, feel free to <#1037971276272242688> and we will gladly talk to you about anything) ` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor(color)
            .setTitle(`Trigger List`)
            .setDescription(`${desc}`)
            .setFooter({ text: "Sent by Bun Bot" })
            .setTimestamp();

        interaction.reply({
            embeds: [ Embed ],
        });

    }
}