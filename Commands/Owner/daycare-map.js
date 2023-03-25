const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daycare-map")
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

        const desc = [ `` ]

        const Embed = new EmbedBuilder()
            .setAuthor({ name: user.username, iconURL: member.displayAvatarURL() })
            .setColor("0xffc0cb")
            .setTitle(`Server Map`)
            .setDescription(`Below is a map of the server and what each channel is for:`)
            .setFields(
                {
                    name: `Welcome and Rules`,
                    value: `<#1089010680486711366> - Server rules.\n<#1087841185319636993> - List of triggering topics that you must spoiler, or are banned.\n<#1054880186400784534> - Where you can grab your roles.\n<#1037975377890517014> - Introduce yourself to the server.\n<#1077719282462502993> - Introduce your system to the server.`,
                },
                {
                    name: `Info and Support`,
                    value: `<#1039873064348962909> - Announcements for the server.\n<#1040093933675487232> - Map of the server.\n<#1087720598442090519> - Current list of perks for boosting the server.\n<#1087849578956595200> - Where you can apply to be a part of our staff team.\n<#1037971276272242688> - Where you can open a ticket regarding server issues, or when you need to talk to staff privately.\n<#1089012044642127892> - Where you can make suggestions for the server.\n<#1085316400354181281> - Where we hold server polls for you to vote on.`,
                },
                {
                    name: `Text Channels`,
                    value: `<#1037958834053976086> - Normal chat where anyone can be, in any headspace.\n<#1037960777136607302> - Where littles and ageres can be in a smol headspace without any fear of topics that can pull them out of their headspace.\n<#1042588396285079552> - Where you can post positive things for us all to celebrate with you.\n<#1087850038258057216> - Where you can talk/post about diaper topics (Must be server appropriate).\n<#1039199877432877106> - A place for you to vent your frustrations. The rules are pinned to the channel. (You must have the <@&1038901883462504539> role from <#1054880186400784534> to see the vent channel.)\n<#1085447609012989962> - Confess anonymously by using \`/confess\`.\n<#1037960677014392832> - Where you can ask to dm or fr someone in the server. (Please get to know someone in the server before asking.)`,
                },
                {
                    name: `Games and Activities`,
                    value: `<#1037959188095176734> - Count as high as you can, but mess up, and you will get the <@&1037972399649456128> role.\n<#1037959339807358986> - Question Of The Day. Answer the Question Of The Day and get 5 🪙's.\n<#1049772775134461952> - Play the classic I-spy game but using gifs or pics.\n<#1074284823000121435> - We post activity sheets for you to complete here.\n<#1076897392475000913> - Turn in your activity sheets here to recieve 10 🪙's per sheet.`,
                },
                {
                    name: `Media`,
                    value: `<#1037959430957969438> - Post pics of yourself here.\n<#1074287055061921963> - Compliment others that have posted in the selfies channel.\n<#1074287091074207845> - Post any other pics/media/memes here.\n<#1039139520794345472> - Where you can talk/post about anything gaming.\n<#1085304336256614480> - Where you can talk/post about anything relating to anime or cartoons.\n<#1039322103389896745> - Where you can share music links of your favorite songs/artists.`,
                },
                {
                    name: `Voice Channels`,
                    value: `<#1041516281003786260> - Where you use music commands while in vc.\n<#1038997540793761833> - This is for anyone that doesn't feel comfortable speaking/can't speak to chat with others in a vc.\n<#1037958834053976087> - Littles vc, No adult topics, just be your little self.\n<#1042630465846263808> - General vc to be used by anyone.\n<#1037967998310432828> - Click on this vc to create your own custom vc.`,
                },
                {
                    name: `Beep Boop`,
                    value: `<#1074284256848773140> - Where you can use \`/rank\`, \`/leader-board coins\`, or \`/leader-board levels\` to see where you rank among other members.\n<#1049783049283457038> - Where level up messages are sent.\n<#1074284326251933716> - Buy items from the shop with 🪙's you recieve by being active around the server.\n<#1074284205858631750> - Any other bot commands go here.\n<#1074284149050982400> - Help the server grow by bumping us on Disboard. Use \`/bump\` in this channel.`,
                },
                {
                    name: `Custom Chat Rooms`,
                    value: `<#1085311964508586065> - List of rules for our Custom Chat Rooms. (You can see how to purchase one here.)`,
                },
                {
                    name: `Partner Servers`,
                    value: `<#1080244095533977740> - Our server add that goes in partnering servers.\n<#1080244164387672074> - Rules to partner with our server.\n<#1088064223860494386> - Partner servers that accept cross verification.\n<#1080244209220603924> - Partner servers that do not cross verify.\n<#1081299424065626274> - Where to apply to become a partnering server.`,
                },
            )
            .setImage(`https://ucarecdn.com/59c56f4f-0d17-44f5-9ab4-2f5b3a113a76/addc97779664499cf3ef5f554200e88b.jpg`)
            .setFooter({ text: "Server Map by Bun Bot" })
            .setTimestamp();

        interaction.reply({ embeds: [ Embed ] });

    }
}