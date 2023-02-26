const { distube } = require("../../Structures/index")

// Queue status template
const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'
    }\` | Loop: \`${queue.repeatMode
        ? queue.repeatMode === 2
            ? 'All Queue'
            : 'This Song'
        : 'Off'
    }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

// DisTube event listeners, more in the documentation page
client.distube
    .on('playSong', (queue, song) =>
        queue.textChannel?.send(
            `Playing \`${song.name}\` - \`${song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`,
        ),
    )
    .on('addSong', (queue, song) =>
        queue.textChannel?.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`,
        ),
    )
    .on('addList', (queue, playlist) =>
        queue.textChannel?.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length
            } songs) to queue\n${status(queue)}`,
        ),
    )
    .on('error', (textChannel, e) => {
        console.error(e);
        textChannel.send(
            `An error encountered: ${e.message.slice(0, 2000)}`,
        );
    })
    .on('finish', queue => queue.textChannel?.send('Finish queue!'))
    .on('finishSong', queue =>
        queue.textChannel?.send('Finish song!'),
    )
    .on('disconnect', queue =>
        queue.textChannel?.send('Disconnected!'),
    )
    .on('empty', queue =>
        queue.textChannel?.send(
            'The voice channel is empty! Leaving the voice channel...',
        ),
    )
    // DisTubeOptions.searchSongs > 1
    .on('searchResult', (interaction, result) => {
        let i = 0;
        interaction.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    song =>
                        `**${++i}**. ${song.name} - \`${song.formattedDuration
                        }\``,
                )
                .join(
                    '\n',
                )}\n*Enter anything else or wait 30 seconds to cancel*`,
        );
    })
    .on('searchCancel', interaction =>
        interaction.channel.send('Searching canceled'),
    )
    .on('searchInvalidAnswer', interaction =>
        interaction.channel.send('Invalid number of result.'),
    )
    .on('searchNoResult', interaction =>
        interaction.channel.send('No result found!'),
    )
    .on('searchDone', () => { });