const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")
const Reply = require("../../Systems/Reply")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kawaii-rules")
        .setDescription("Sends the selected rules. (Owner only)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(sub => sub.setName("room")
            .setDescription("Room Rules"))
        .addSubcommand(sub => sub.setName("server-rules")
            .setDescription("Server Rules"))
        .addSubcommand(sub => sub.setName("seeking")
            .setDescription("Seeking Rules"))
        .addSubcommand(sub => sub.setName("triggers")
            .setDescription("Trigger List"))
        .addSubcommand(sub => sub.setName("vc")
            .setDescription("VC Rules")),

    /**
     * @param { ChatInputCommandInteraction } interaction
     * @param { CustomClient } client
     */
    async execute(interaction, client) {

        const { user, member, options } = interaction
        const { emojilist, color } = client

        if (user.id !== `806050057811132436`) return Reply(interaction, emojilist.cross, "You do not have access to this command!", true)

        switch (options.getSubcommand()) {

            case "room": {

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
                    .setFooter({ text: "Rules by Bun Bot" })
                    .setTimestamp();

                interaction.reply({ embeds: [ Embed ] });

            }

                break;

            case "server-rules": {

                const desc = [ `1. You must ID verify to join this server, only 18+ will be admitted.

        2. No forms of discrimination based on gender, race, religion, etc will be tolerated whatsoever.
        
        3. Respect the decision of staff. If you wish to contest a warn or ban you are requested to <#1037971276272242688> or message another mod. Don't fight them in public channels.
        
        4. No spamming, flooding the chat, shitposting, or sending large walls of text into any of the channels. Links, memes, selfies, tiktoks etc go in <#1074287091074207845> .
        
        5. Any and all self-promotion must go through staff. NO EXCEPTIONS!
        
        6. Please keep adult talk (NO NSFW chat of any kind, this is an SFW server) and cussing out of <#1037960777136607302> at all times.
        
        7. Cussing and all Triggering topics must be spoilered/censord when used in the server!
        
        8. Please respect peoples' roles - they are there for a reason. That means if they have No Flirting/No Touch/No DMs, then respect that. Do not give anyone a nickname/petname without getting consent first!
        
        9. Please use the proper channels, they are labeled the way they are for a reason. (You must reach level 5 in the server before you can use the <#1037960677014392832> channel. If you ask to dm someone before you reach level 5 and/or not in <#1037960677014392832> you will be given an automatic warning)
        
        10. This is a server for littles that want to regress, but we do not cater to ageplay rp here. If you want to find a place specifically for that, please find a server that better serves your needs.
        
        11. We have a seeking area in the server, but it is level-locked and role-locked. Once you reach level 5, you can grab the <@&1110373693084946573> role to be able to access the seeking area. This is both to protect our members and have people who don't want to deal with seeking not have to.
        
        12. No attention-seeking (eg. roleplaying self-harm, asking to be taken care of by people without the <@&1080517195412541460> role, ...). Staff will give you a verbal warning first if they think your behavior is inappropriate, and an official one will follow if you continue.
        
        13. If you as a member feel uncomfortable or threatened around another member, please <#1037971276272242688>. We will resolve the situation for you and never think you are bugging us or wasting our time.

        14. You must stay active! If you go inactive for 30+ days without notifying staff or opening a ticket you will be kicked. You may rejoin if you like. However you will be kicked again if you go inactive again.
        
        15. We have a punishment protocol. For all rules that don't specify a punishment explicitly they are as follows:
        Warn X3
        Ban
        
        Exception:
        (Staff reserves the right to ban any member at any time if staff feels the members actions threaten other members or the server itself.)
        
        16. Please follow Discord TOS. (not doing so will result in a ban)` ]

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

                break;

            case "seeking": {

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

                interaction.reply({ embeds: [ Embed ] });

            }

            case "triggers": {

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

                interaction.reply({ embeds: [ Embed ] });

            }

                break;

            case "vc": {

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
                    .setTitle(`VC Rules`)
                    .setDescription(`${desc}`)
                    .setImage(`https://ucarecdn.com/87c4ca9b-a3af-4756-aaff-9124049f8278/Rules.jpg`)
                    .setFooter({ text: "Rules by Bun Bot" })
                    .setTimestamp();

                interaction.reply({ embeds: [ Embed ] });

            }

                break;

        }

    }

}