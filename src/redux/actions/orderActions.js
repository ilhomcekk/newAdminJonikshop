import requests from 'src/helpers/requests'

export const getOrders = (params) => async (dispatch) => {
  try {
    const response = await requests.getOrders(params)
    dispatch({ type: 'get_orders', payload: response })
  } catch (err) {
    console.log(err)
  }
}

export const getOrderStatistic = () => async (dispatch) => {
  try {
    const response = await requests.getOrderStatistic()
    dispatch({ type: 'get_order_statistic', payload: response })
  } catch (err) {
    console.log(err)
  }
}

export const getStreamStatistic = (params) => async (dispatch) => {
  try {
    const response = await requests.getStreamStatistic(params)
    dispatch({ type: 'get_stream_order_statistic', payload: response })
  } catch (err) {
    console.log(err)
  }
}

export const getOrderTotal = () => async (dispatch) => {
  try {
    const response = await requests.getOrderTotal()
    dispatch({ type: 'get_stream_order_total', payload: response })
  } catch (err) {
    console.log(err)
  }
}
