import requests from 'src/helpers/requests'

export const getPopularProducts = () => async (dispatch) => {
  try {
    const response = await requests.getPopularProducts()
    dispatch({ type: 'get_popular_products', payload: response })
  } catch (err) {
    console.log(err)
  }
}

export const getMarketProducts = (params) => async (dispatch) => {
  try {
    const response = await requests.getMarketProducts(params)
    dispatch({ type: 'get_market_products', payload: response })
  } catch (err) {
    console.log(err)
  }
}

export const getStreamProducts = (params) => async (dispatch) => {
  try {
    const response = await requests.getStreamProducts(params)
    dispatch({ type: 'get_stream_products', payload: response })
  } catch (err) {
    console.log(err)
  }
}

export const createReferralLink = async (params) => {
  try {
    const response = await requests.createReferralLink(params)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteReferralLink = async (id) => {
  try {
    const response = await requests.deleteReferralLink(id)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const editReferralLink = async (id, params) => {
  try {
    const response = await requests.editReferralLink(id, params)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const detailReferralLink = async (id) => {
  try {
    const response = await requests.detailReferralLink(id)
    return response
  } catch (err) {
    console.log(err)
  }
}
