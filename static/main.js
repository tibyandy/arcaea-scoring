window.require = (scriptSrc, then) => {
  const script = document.createElement('script')
  script.src = scriptSrc
  script.onload = () => setTimeout(then, 100)
  document.currentScript.parentNode.insertBefore(script, document.currentScript)
}

window.APP = {}

require('../output/imports.js', () => {
  const data = Object.values(window.APP.scoreData).map(
    ({
      MetaInfo: { SongName: song, Artist: art },
      PlayerData: { FTR: { Level: lv, SongConstant: ctt, HighScore: score, Modifier: mod, EarnedPotential: ptt, MaxPotential: max } }
    }) => ({ song, art, lv, ctt, score, mod, ptt, max })
  ).sort(({ ptt: pttA }, { ptt: pttB }) => pttA - pttB)

  const html = data.map(({ song, art, lv, ctt, score, mod, ptt, max }) =>
    `<tr><td>${lv}<br/>${ctt*10}</td><td>(${mod*10})<br/>${ptt*10}</td><td>${-Math.ceil((max-ptt)*100/max)}%<br>${max*10}</td><td>${song}<br/>${art}</td><td>${score}</td>`
  ).join('')
  document.body.innerHTML = `<table>${html}</table>`
})
