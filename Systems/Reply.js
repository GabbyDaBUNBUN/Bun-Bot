const { EmbedBuilder, CommandInteraction } = require("discord.js")

/**
 * @param {CommandInteraction} interactionInteraction
 * @param {String} emoji
 * @param {String} description
 * @param {Boolean} type
 */

function Reply(interaction, emoji, description, type) {

    interaction.reply({

        embeds: [

            new EmbedBuilder()
                .setColor("0xFFC0CB")
                .setDescription(`\`${emoji}\` | ${description}`)
                .setTimestamp()
                .setFooter({ text: "Sent by Bun Bot" })

        ],

        ephemeral: type || true

    })

}

module.exports = Reply