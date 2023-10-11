import $api from '../../../../../src/helpers/requests'

export const getOrders = async (params) => {
  try {
    const response = await $api.get('/product/order-list-admin/', { params })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getOrderStatistic = async () => {
  try {
    const response = await $api.get('/product/product-order-statistic/')
    return response
  } catch (err) {
    console.log(err)
  }
}
