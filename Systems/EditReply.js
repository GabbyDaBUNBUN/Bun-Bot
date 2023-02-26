const { EmbedBuilder, CommandInteraction } = require("discord.js")

/**
 * @param {CommandInteraction} interactionInteraction
 * @param {String} emoji
 * @param {String} description
 * @param {Boolean} type
 */

function EditReply(interaction, emoji, description, type) {

    interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor("0xffc0cb")
                .setDescription(`${emoji} | ${description}`)
                .setTimestamp()
                .setFooter({ text: "Sent by Bun Bot" }),
        ],

        ephemeral: type || true

    });

};

module.exports = EditReply;