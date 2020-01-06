const merge = (chartConstants, dateScores) => {
    const { artist, level, constant } = chartConstants
    const scores = dateScores.map(({ player, date, scores }) => ({
        player,
        date,
        scores
    }))
    console.log({ artist, level, constant })
    console.log(scores[0])
}

export default { merge }