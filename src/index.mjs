import chartConstantParser from './lib/chart-constants-parser.mjs'
import scoresParser from './lib/scores-parser.mjs'
import scoresMerger from './lib/scores-merger.mjs'
import { writeFile } from './lib/commons.mjs'

async function run () {
    const chartConstantsPromise = chartConstantParser.parse('data/static/chart-constants.tsv')
    const scoresPromise = scoresParser.parse('user-scores/tibyandy-2020-01-04.psv')

    const [songs, playerScores] = await Promise.all([
        chartConstantsPromise,
        scoresPromise
    ])
    const scoreData = scoresMerger.merge(songs, playerScores)

    writeFile('output/tibyandy-2020-01-04.js', `window.APP.scoreData=\n${JSON.stringify(scoreData).split('},"').join('},\n"').split('{"MetaInfo"').join('{\n"MetaInfo"').split('}}}').join('}}\n}')}\n`)
}

run()
