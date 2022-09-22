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
import { percent, minMax } from "./graph"

export function Dashboard() {

  const [data, setData] = useState(false)
  const [ready, setReady] = useState(false)
  const [dailyPercent, setDailyPercent] = useState(0.00)
  const [monthlyPercent, setMonthlyPercent] = useState(0)
  const [yearlyPercent, setYearlyPercent] = useState(0)

  const [minDaily, setMinDaily] = useState(0)
  const [maxDaily, setMaxDaily] = useState(0)

  const percentage = (data) => {
    setDailyPercent(percent(data[0]))
    setMonthlyPercent(percent(data[1]))
    setYearlyPercent(percent(data[2]))
  }

  async function request() {
    const resp = await requestAPI('get', 'api/getvisitor')
    if (resp.status == 0) {
      setData(resp.data)
      percentage(resp.data)
      console.log(resp.data)
    }
    setReady(true)
  }

  useEffect(() => {
    if (!ready || !data) {
      request()
    }
  }, [])

  return (
    <>
      {!ready ? <CSpinner color="primary" /> :
        <CRow>
          <CCol sm={12} lg={4}>
            <CWidgetStatsA
              className="mb-4"
              color="primary"
              value={
                <>
                  {data[0][0]['views']}
                  <span className="fs-6 fw-normal">
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
                    labels: data[0].map((datas, i) => {
                      return datas['date']
                    }),
                    datasets: [
                      {
                        label: 'Visitor',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        data: data[0].map((datas, i) => {
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
                        min: minMax(data[0]).min - minMax(data[0]).range * 10 / 100,
                        max: minMax(data[0]).max + minMax(data[0]).range * 10 / 100,
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
                  {data[1][6]['views']}
                  <span className="fs-6 fw-normal">
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
                    labels: data[1].map((datas, i) => {
                      return datas['date']
                    }),
                    datasets: [
                      {
                        label: 'Visitor',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        data: data[1].map((datas, i) => {
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
                        min: minMax(data[1]).min - minMax(data[1]).range * 10 / 100,
                        max: minMax(data[1]).max + minMax(data[1]).range * 10 / 100,
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
                  {data[2][6]['views']}
                  <span className="fs-6 fw-normal">
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
                    labels: data[2].map((datas, i) => {
                      return datas['date']
                    }),
                    datasets: [
                      {
                        label: 'Visitor',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        data: data[2].map((datas, i) => {
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
                        min: minMax(data[2]).min - minMax(data[2]).range * 10 / 100,
                        max: minMax(data[2]).max + minMax(data[2]).range * 10 / 100,
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