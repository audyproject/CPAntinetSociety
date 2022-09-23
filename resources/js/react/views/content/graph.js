function percent(data){
    if(data[5]['views'] == 0) {
        if(data[6]['views'] == 0) return 0
        else return 100
      }
    else return (Math.floor(data[6]['views']-data[5]['views']) / data[5]['views'] * 100).toFixed(2)
}

function minMax(data) {
    let min = 0
    let max = 0
    let range = 0
    data.map((datas, i) => {
      if (i == 0) {
        min = datas['views']
        max = datas['views']
      }
      if (datas['views'] > max) {
        max = datas['views']
      }
      if (datas['views'] < min) {
        min = datas['views']
      }
    })
    if((max-min)*10/100 < 1) range = 1
    else range = Math.round((max-min)*10/100)
    // console.log(max + "-" + min + "-" + range)
    return { min, max, range }
}

export {
    percent,
    minMax,
}