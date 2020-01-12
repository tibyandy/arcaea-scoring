import {
    readFileContentsAsString,
    splitLinesIntoArray,
    forEachEntry,
    trim,
    splitByTabs,
    filterEmptyEntries,
    isEmpty
} from './commons.mjs'

const DIFFICULTY_LEVELS = {
    past: 'pst',
    present: 'prs',
    future: 'ftr'
}

const startsWithLevel = string => string.toLowerCase().startsWith('level ')

const difficultyOf = string => DIFFICULTY_LEVELS[string.toLowerCase()]

const categorizeLine = string => {
    const values = splitByTabs(string)
    if (values.length === 3) {
        const [ song, artist, constant ] = values
        return { song, artist, constant: Number(constant) }
    }
    if (startsWithLevel(string))
        return { level: string.split(' ')[1] }
    const difficulty = difficultyOf(string)
    if (difficulty !== undefined) return { difficulty }
    return { string }
}

const hydrateLines = lines => {
    let difficulty, level
    return lines.map(({ difficulty: d, level: l, song, artist, constant: c }) => {
        if (d === 0 || d) { difficulty = d; return null }
        if (l) { level = l; return null }
        return { constant: c, difficulty, level, song, artist }
    }).filter(e => !!e)
}

const groupByDifficultyAndName = songs => songs.reduce(
    (result, { difficulty, level, song, artist, constant }) => {
        if (!result[song]) {
            result[song] = {
                artist,
                levels: {},
                constants: {},
                notecount: {}
            }
        }
        result[song].levels[difficulty] = level
        result[song].constants[difficulty] = constant
        result[song].notecount[difficulty] = 0
        return result
    }, {}
)

const parse = fileSrc => readFileContentsAsString(fileSrc)
    .then(splitLinesIntoArray)
    .then(filterEmptyEntries)
    .then(forEachEntry(trim, categorizeLine))
    .then(hydrateLines)
    .then(groupByDifficultyAndName)

export default { parse }
