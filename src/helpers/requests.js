import $api from './createApi'

export const formData = (data) => {
  const form = new FormData()
  for (const key in data) {
    if (Array.isArray(data[key])) {
      for (const childKey in data[key]) {
        form.append(`${key}[${childKey}]`, data[key][childKey])
      }
    } else {
      form.append(key, data[key])
    }
  }
  return form
}

const requests = {
  // Auth
  postSignIn: (params) => $api.post(`/user/login/`, formData(params)),
  updateProfile: (params) => $api.put(`/user/api/v1/update-user/`, formData(params)),
  updateProfilePatch: (params) => $api.patch(`/user/api/v1/update-user/`, formData(params)),
  postRegister: (params) => $api.post(`/user/admin-signup/`, formData(params)),
  getProfile: () => $api.get(`/user/profile/`),
  getOrderStatistic: () => $api.get(`/product/product-order-statistic/`),
  getPopularProducts: () => $api.get(`/product/popular-product-list/`),
  getTransactionAdmin: (params) => $api.get(`/user/list-application-admin/`, { params }),
  getMarketProducts: (params) => $api.get(`/product/product-list-admin/`, { params }),
  getStreamProducts: (params) => $api.get(`/product/referral-link-list/`, { params }),
  createReferralLink: (params) => $api.post(`/product/referral-link-create/`, formData(params)),
  deleteReferralLink: (id) => $api.delete(`/product/referral-link-detail/${id}/`),
  editReferralLink: (id, params) =>
    $api.put(`/product/referral-link-update/${id}/`, formData(params)),
  detailReferralLink: (id) => $api.get(`/product/referral-link-detail/${id}/`),
  getOrders: (params) => $api.get(`/product/order-list-admin/`, { params }),
  getStreamStatistic: (params) => $api.get(`/product/order-statistics-admin/`, { params }),
  getOrderTotal: () => $api.get(`/product/order-total-admin/`),
}

export default requests
