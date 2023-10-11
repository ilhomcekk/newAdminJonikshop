import React, { useEffect, useState } from 'react'
import { CRow, CCol, CWidgetStatsA } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowTop } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderStatistic } from 'src/redux/actions/orderActions'

const WidgetsDropdown = () => {
  const dispatch = useDispatch()
  const orderStatisctics = useSelector((state) => state.order.orderStatisctics?.data)

  useEffect(() => {
    dispatch(getOrderStatistic())
  }, [])

  return (
    <CRow>
      {orderStatisctics?.map((item, idx) => (
        <CCol key={idx} sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={
              <>
                {item?.count}{' '}
                <span className="fs-6 fw-normal">
                  ({item?.percentage}% <CIcon icon={cilArrowTop} />)
                </span>
              </>
            }
            title={item?.status + ' buyurtmalar'}
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
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
      ))}
    </CRow>
  )
}

export default WidgetsDropdown
