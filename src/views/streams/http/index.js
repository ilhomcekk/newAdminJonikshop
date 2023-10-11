import $api from '../../../../../src/helpers/requests'

export const getStreamProducts = async (params) => {
  const response = await $api.get('/product/referral-link-list/', { params })
  return response
}
