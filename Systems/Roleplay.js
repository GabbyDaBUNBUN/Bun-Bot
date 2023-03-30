const { EmbedBuilder, CommandInteraction, User } = require("discord.js")

/**
 * @param {CommandInteraction} interactionInteraction
 * @param {String} title
 * @param {User} user
 * @param {User} Mention
 * @param {String} description
 * @param {URL} image
 * @param {Boolean} type
 */

function Roleplay(interaction, title, user, Mention, description, image, type) {

    interaction.reply({
        content: `${Mention}`,
        embeds: [
            new EmbedBuilder()
                .setColor("#ffc0cb")
                .setTitle(`${title}`)
                .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
                .setDescription(`${description}`)
                .setThumbnail(user.displayAvatarURL())
                .setImage(`${image}`)
                .setTimestamp()
                .setFooter({ text: "Roleplay by Bun Bot" }),
        ],
        ephemeral: type,
    })

}

module.exports = Roleplay;