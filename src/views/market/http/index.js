import { formData } from '../../../../../src/helpers/formData'
import $api from '../../../../../src/helpers/requests'

export const getMarketProducts = async (params) => {
  try {
    const response = await $api.get(`/product/product-list-admin/`, { params })
    return response
  } catch (err) {
    console.log(err)
  }
}

export const createReferralLink = async (params) => {
  try {
    const response = await $api.post('/product/referral-link-create/', formData(params))
    return response
  } catch (err) {
    console.log(err)
  }
}

export const editReferralLink = async (id, params) => {
  try {
    const response = await $api.put(`/product/referral-link-update/${id}/`, formData(params))
    return response
  } catch (err) {
    console.log(err)
  }
}

export const detailReferralLink = async (id) => {
  try {
    const response = await $api.get(`/product/referral-link-detail/${id}/`)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const deleteReferralLink = async (id) => {
  try {
    const response = await $api.delete(`/product/referral-link-detail/${id}/`)
    return response
  } catch (err) {
    console.log(err)
  }
}
