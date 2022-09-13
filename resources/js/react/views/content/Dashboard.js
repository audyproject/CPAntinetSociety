import { CCol, CRow, CSpinner, CWidgetStatsA } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import {
  cilArrowBottom,
  cilArrowTop,
} from "@coreui/icons";
import { getStyle } from '@coreui/utils'
import { useEffect, useState } from "react";
import { requestAPI } from "../../API";

export function Dashboard() {

  const [data, setData] = useState(false)
  const [ready, setReady] = useState(false)
  const [dailyPercent, setDailyPercent] = useState(0)
  const [monthlyPercent, setMonthlyPercent] = useState(0)
  const [yearlyPercent, setYearlyPercent] = useState(0)

  const [minDaily, setMinDaily] = useState(0)
  const [maxDaily, setMaxDaily] = useState(0)

  async function request() {
    const resp = await requestAPI('get', 'api/getvisitor')
    if (resp.status == 0) {
      setData(resp.data)
      console.log(resp.data)
    }
    setReady(true)
  }

  function minMax(data) {
    let min = 0
    let max = 0
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
    return { min, max }
  }

  useEffect(() => {
    if (!ready || !data) {
      request()
    }
    if (data) {
      if (data[0][data[0].length - 1] && data[0][data[0].length - 2]) {
        setDailyPercent((Math.floor((data[0][data[0].length - 1]['views'] - data[0][data[0].length - 2]['views'])) / data[0][data[0].length - 2]['views'] * 100).toFixed(2))
      }
      if (data[1][data[1].length - 1] && data[1][data[1].length - 2]) setDailyPercent((Math.floor((data[1][data[1].length - 1]['views'] - data[1][data[1].length - 2]['views'])) / data[1][data[1].length - 2]['views'] * 100).toFixed(2))
      if (data[2][data[2].length - 1] && data[2][data[2].length - 2]) setDailyPercent((Math.floor((data[2][data[2].length - 1]['views'] - data[2][data[2].length - 2]['views'])) / data[2][data[2].length - 2]['views'] * 100).toFixed(2))
      // if(data[1][0] && data[1][1]) setMonthlyPercent(Math.floor((data[1][0]['views per bulan'] - data[1][1]['views per bulan']))/data[1][1]['views per bulan']*100)
      // if(data[2][0] && data[2][1]) setYearlyPercent(Math.floor((data[2][0]['views per tahun'] - data[2][1]['views per tahun']))/data[2][1]['views per tahun']*100)
    }
  }, [data])

  return (
    <>
      {!data ? <CSpinner color="primary" /> :
        <CRow>
          <CCol sm={12} lg={4}>
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              value={
                <>
                  {data[0][data[0].length - 1]['views']}
                  <span className="fs-6 fw-normal">
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    ({dailyPercent + "%"} {dailyPercent > 0 ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />})
                  </span>
                </>
              }
              title="Daily Visitor"
              chart={
                <CChartLine
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    // labels: [
                    //   data[0][6]['date'],
                    //   data[0][5]['date'],
                    //   data[0][4]['date'],
                    //   data[0][3]['date'],
                    //   data[0][2]['date'],
                    //   data[0][1]['date'],
                    //   data[0][0]['date']
                    // ],
                    labels: data[0].reverse().map((datas, i) => {
                      return datas['date']
                    }),
                    datasets: [
                      {
                        label: 'Visitor',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        // data: [65, 59, 84, 84, 51, 55, 40],
                        // data: [
                        //   data[0][6]['views'],
                        //   data[0][5]['views'],
                        //   data[0][4]['views'],
                        //   data[0][3]['views'],
                        //   data[0][2]['views'],
                        //   data[0][1]['views'],
                        //   data[0][0]['views'],
                        // ],
                        data: data[0].reverse().map((datas, i) => {
                          return datas['views']
                        }),
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        min: minMax(data[0]).min - 1,
                        max: minMax(data[0]).max + 1,
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 1,
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
          <CCol sm={12} lg={4}>
            <CWidgetStatsA
              className="mb-4"
              color="success"
              value={
                <>
                  {data[1][0]['views']}
                  <span className="fs-6 fw-normal">
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    ({monthlyPercent + "%"} {monthlyPercent > 0 ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />})
                  </span>
                </>
              }
              title="Monthly Visitor"
              chart={
                <CChartLine
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    // labels: [
                    //   data[1][6]['date'],
                    //   data[1][5]['date'],
                    //   data[1][4]['date'],
                    //   data[1][3]['date'],
                    //   data[1][2]['date'],
                    //   data[1][1]['date'],
                    //   data[1][0]['date']
                    // ],
                    datasets: [
                      {
                        label: 'Visitor',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        // data: [65, 59, 84, 84, 51, 55, 40],
                        // data: [
                        //   data[1][6]['views'],
                        //   data[1][5]['views'],
                        //   data[1][4]['views'],
                        //   data[1][3]['views'],
                        //   data[1][2]['views'],
                        //   data[1][1]['views'],
                        //   data[1][0]['views'],
                        // ],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        min: minMax(data[1]).min - 1,
                        max: minMax(data[1]).max + 1,
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 1,
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
          <CCol sm={12} lg={4}>
            <CWidgetStatsA
              className="mb-4"
              color="danger"
              value={
                <>
                  {data[2][0]['views']}
                  <span className="fs-6 fw-normal">
                    {/* (-12.4% <CIcon icon={cilArrowBottom} />) */}
                    ({yearlyPercent + "%"} {yearlyPercent > 0 ? <CIcon icon={cilArrowTop} /> : <CIcon icon={cilArrowBottom} />})
                  </span>
                </>
              }
              title="Yearly Visitor"
              chart={
                <CChartLine
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    // labels: [
                    //   data[2][6]['date'],
                    //   data[2][5]['date'],
                    //   data[2][4]['date'],
                    //   data[2][3]['date'],
                    //   data[2][2]['date'],
                    //   data[2][1]['date'],
                    //   data[2][0]['date']
                    // ],
                    datasets: [
                      {
                        label: 'Visitor',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        // data: [65, 59, 84, 84, 51, 55, 40],
                        // data: [
                        //   data[2][6]['views'],
                        //   data[2][5]['views'],
                        //   data[2][4]['views'],
                        //   data[2][3]['views'],
                        //   data[2][2]['views'],
                        //   data[2][1]['views'],
                        //   data[2][0]['views'],
                        // ],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        min: minMax(data[2]).min - 1,
                        max: minMax(data[2]).max + 1,
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 1,
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
        </CRow>
      }
    </>
  )
}