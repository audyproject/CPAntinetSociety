import { CCol, CSpinner, CWidgetStatsA } from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import CIcon from "@coreui/icons-react";
import {
    cilArrowBottom,
} from "@coreui/icons";
import { getStyle } from '@coreui/utils'
import { useEffect, useState } from "react";
import { requestAPI } from "../../API";

export function Dashboard(){

  const [data, setData] = useState(false)
  const [ready, setReady] = useState(false)

  async function request(){
    const resp = await requestAPI('get', 'api/getvisitor')
    if(resp.status == 0){
      setData(resp.data)
    }
    setReady(true)
  }

  useEffect(() => {
    if(!ready || !data){
      request()
    }
  },[])

    return(
        <>
        {!data ? <CSpinner color="primary"/> :
        <CCol sm={6} lg={3}>
        <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
                <>
                26K{' '}
                <span className="fs-6 fw-normal">
                    (-12.4% <CIcon icon={cilArrowBottom} />)
                </span>
                </>
            }
            title="Daily Visitor"
            chart={
                <CChartLine
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'Visitor',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        data: [65, 59, 84, 84, 51, 55, 40],
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
                        min: 30,
                        max: 89,
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
        }
        </>
    )
}