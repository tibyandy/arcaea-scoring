import {
    readFileContentsAsString,
    splitLinesIntoArray,
    forEachEntry,
    trim,
    splitByPipes,
    filterEmptyEntries,
    isEmpty
} from './commons.mjs'

const removeLinesWithoutScores = lines => lines.filter(([first, ...values]) => values.join('') !== '')

const DIFFICULTIES = ['pst', 'prs', 'ftr']

const calcRaw = score => {
    if (score <= 9800) return (score - 9500) / 300
    if (score < 9950) return 1 + (score - 9800) / 400
    if (score < 10000) return 1.5 + (score - 9950) / 100
    return 2
}

const calc = score => {
    if (score === null) return null
    score = Math.floor(calcRaw(score) * 10) / 10
    return score
}

const groupByDifficultiesAndSongs = ([[dateAndPlayer, ...difficulties], ...songs ]) => {
    const [date, ...playerRest] = dateAndPlayer.split(' ')
    const player = playerRest.join(' ').trim()
    const scores = songs.map(([song, ...scores]) => ({
        song,
        ...scores.reduce((scores, score, i) => {
            return ({
            ...scores,
            [difficulties[i].toLowerCase()]: Number(score)
        })}, { pst: null, prs: null, ftr: null })
    })).reduce((songs, { song, pst, prs, ftr }) => ({
        ...songs,
        [song]: {
            scores: { pst, prs, ftr },
            modifiers: { pst: calc(pst), prs: calc(prs), ftr: calc(ftr) }
        }
    }), {})
    return { player, date, scores }
}

const parse = fileSrc => readFileContentsAsString(fileSrc)
    .then(splitLinesIntoArray)
    .then(filterEmptyEntries)
    .then(forEachEntry(
        splitByPipes,
        forEachEntry(trim)
    ))
    .then(removeLinesWithoutScores)
    .then(groupByDifficultiesAndSongs)

export default { parse }
