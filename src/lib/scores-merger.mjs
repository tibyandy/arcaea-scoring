const parseIntoDifficulties = ({ scores, modifiers, levels, constants }) =>
    Object.entries(constants).reduce((difficulties, [diff, constant]) => ({
        ...difficulties,
        ...(scores[diff] ? {
            [diff.toUpperCase()]: {
                Level: levels[diff],
                SongConstant: constant,
                HighScore: scores[diff],
                Modifier: modifiers[diff],
                EarnedPotential: modifiers[diff] === null ? null : Math.round(Math.max(0, modifiers[diff] + constant) * 10) / 10,
                MaxPotential: constant + 2,
            }
        } : {})
    }), {})

const merge = (chartConstants, dateScores) => {
    const { player, date, scores } = dateScores
    return Object.entries(scores).reduce((songs, [song, { scores, modifiers }]) => ({
        ...songs,
        [song]: {
            MetaInfo: {
                SongName: song,
                Artist: chartConstants[song].artist
            },
            PlayerData: parseIntoDifficulties({
                scores,
                modifiers,
                levels: chartConstants[song].levels,
                constants: chartConstants[song].constants,
            })
        }
    }), {})
}

export default { merge }
