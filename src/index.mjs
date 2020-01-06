import chartConstantParser from './lib/chart-constants-parser.mjs'
import scoresParser from './lib/scores-parser.mjs'
import scoresMerger from './lib/scores-merger.mjs'

async function run () {
    const chartConstantsPromise = chartConstantParser.parse('data/static/chart-constants.tsv')
    const scoresPromise = scoresParser.parse('user-scores/tibyandy-2020-01-04.psv')
    scoresMerger.merge(await chartConstantsPromise, [await scoresPromise])
}

run()