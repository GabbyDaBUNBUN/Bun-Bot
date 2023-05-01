const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rules-gardens")
        .setDescription("Sends Server Rules.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { color } = client

        const desc = [ `By Clicking On This Panel You Agree To The Rules And Regulations Of This Server Along With Discord TOS and Guidelines.

        🌿1. Respect the TOS and Guidelines of Discord
        
        🌿2. No discriminatory behavior will be permitted (Including but not limited to - slurs, racism, bullying, ableism, and homophobia)
        
        🌿3. Respect the Staff Hierarchy and Staff Members themselves. Any Trolling, Harassment, Disrespect, etc. will result in our Three Strike System which includes us putting a role on you so you don't slip past us.
        
        🌿4. If you are in Littlespace PLEASE do not venture into our NSFW channels. I will not buy the fact that you cannot control where you click. If you have a CG they are responsible for you at that moment when you go into the server. If I see you in a little space in an NSFW channel you will receive a strike. In addition, if anyone sexualizes little space in any way you will be banned. We do not tolerate DDLG, ABDL, or other little space sexualization. This is a safe space.
        
        🌿5. If any NSFW content or symbolism regarding a minor is found in this server, on a member's pfp or name, that member responsible will also be banned. No minor content at all. P3DOs are not tolerated in the slightest.
        
        🌿6. Since this is a server with a focus on dating this must be said-
        
        If you and your partner break up I don't care. If you create the drama of any kind due to a breakup or a rejection you will be kicked from this server. Please keep it to yourselves. No witch hunting. No taking sides. I am here to provide a match-making process not be a relationship counselor.
        
        🌿7. If you are a part of my blacklist you will be banned upon arrival.
        
        🌿8. If you are a PM I will not accept you if you come from the server Cultivities. Due to personal reasons, I prefer those from PMN.
        
        🌿9. Any minor trying to get in will also be banned - this is a server for adults.
        
        🌿10. Please do not discuss any politics or religion in a biased, hateful way. Have debates, but the moment it turns into a fight it will stop
        
        🌿11. Keep all discussions in their appropriate channels!! Talking about weed, go to our MaryJane Fields, talk about NSFW go to our Jasmine Path, etc. 
        
        🌿12. Role Consent is key. RESPECT PEOPLES ROLES!!! 
        `]

        const Embed = new EmbedBuilder()
            .setColor(color)
            .setTitle("Poll")
            .setDescription(`${desc}`)
            .setImage(`https://ucarecdn.com/a12de301-5bf2-44ef-a32c-8a456ad40054/IMG_5905.jpg`)
            .setFooter({ text: "Rules by Bun Bot" })
            .setTimestamp()

        const Buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(`Yes`)
                    .setEmoji(`✅`)
                    .setCustomId(`Rules-Agree`)
                    .setStyle(ButtonStyle.Success),
            )

        interaction.reply({ embeds: [ Embed ], components: [ Buttons ] })

    }
}