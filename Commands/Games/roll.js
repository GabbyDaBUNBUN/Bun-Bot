const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const { CustomClient } = require("../../Structures/Classes/CustomClient")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription("Rolls dice")
        .addStringOption(opt => opt.setName("dice").setDescription("Enter the die/dice you want to role, along with the multiplier. Examples: 1d20 / 5d10+5 / 3d6-2").setRequired(true)),

    /**
     * @param { CustomClient } client
     * @param { ChatInputCommandInteraction } interaction
     */
    async execute(interaction, client) {

        const { options, user } = interaction
        const { color } = client

        const content = options.getString("dice")

        const msgContent = content.trim().toLowerCase()

        let matches = msgContent.replaceAll('d', ' ').replaceAll('D', ' ').replaceAll('+', ' + ').replaceAll('-', ' - ').replaceAll('*', ' * ').replaceAll('/', ' / ').split(' '),
            numDice = matches[ 0 ],
            numSides = matches[ 1 ],
            numOperator = matches[ 2 ],
            numBonus = matches[ 3 ],
            diceResults;
        if (!numBonus) numBonus = 0


        function rollDie(sides) {
            if (!sides) sides = 6;

            return 1 + Math.floor(Math.random() * sides);
        }

        function rollDice(number, sides) {
            let diceArray = [];

            while (number-- > 0) diceArray.push(rollDie(sides));

            return diceArray;
        }

        function calcDiceTotal(diceArray) {
            return diceArray.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
            );
        }

        diceResults = rollDice(numDice, numSides);

        if (numOperator === "+") {

            let diceTotal = calcDiceTotal(diceResults) + parseInt(numBonus)

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
                        .setColor(color)
                        .setTitle("🎲 Roll")
                        .setDescription(`**You have rolled:** \`${diceResults.join(", ")}\` | **Your multiplier:** \`${numOperator}${numBonus}\` **Your dice total:** \`${diceTotal}\``)
                        .setThumbnail('https://ucarecdn.com/0544ba87-4a6d-462f-a264-31a2c3553087/il_1588xN2699066247_ch6l.jpg')
                        .setFooter({ text: "DND Dice by Bun Bot" })
                        .setTimestamp()
                ]
            });

        } else if (numOperator === "-") {

            let diceTotal = calcDiceTotal(diceResults) - parseInt(numBonus)

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
                        .setColor(color)
                        .setTitle("🎲 Roll")
                        .setDescription(`**You have rolled:** \`${diceResults.join(", ")}\` | **Your multiplier:** \`${numOperator}${numBonus}\` **Your dice total:** \`${diceTotal}\``)
                        .setThumbnail('https://ucarecdn.com/0544ba87-4a6d-462f-a264-31a2c3553087/il_1588xN2699066247_ch6l.jpg')
                        .setFooter({ text: "DND Dice by Bun Bot" })
                        .setTimestamp()
                ]
            });

        } else if (numOperator === "*") {

            let diceTotal = calcDiceTotal(diceResults) * parseInt(numBonus)

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
                        .setColor(color)
                        .setTitle("🎲 Roll")
                        .setDescription(`**You have rolled:** \`${diceResults.join(", ")}\` | **Your multiplier:** \`${numOperator}${numBonus}\` **Your dice total:** \`${diceTotal}\``)
                        .setThumbnail('https://ucarecdn.com/0544ba87-4a6d-462f-a264-31a2c3553087/il_1588xN2699066247_ch6l.jpg')
                        .setFooter({ text: "DND Dice by Bun Bot" })
                        .setTimestamp()
                ]
            });

        } else if (numOperator === "/") {

            let diceTotal = calcDiceTotal(diceResults) / parseInt(numBonus)

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
                        .setColor(color)
                        .setTitle("🎲 Roll")
                        .setDescription(`**You have rolled:** \`${diceResults.join(", ")}\` | **Your multiplier:** \`${numOperator}${numBonus}\` **Your dice total:** \`${diceTotal}\``)
                        .setThumbnail('https://ucarecdn.com/0544ba87-4a6d-462f-a264-31a2c3553087/il_1588xN2699066247_ch6l.jpg')
                        .setFooter({ text: "DND Dice by Bun Bot" })
                        .setTimestamp()
                ]
            });

        }

    }

}