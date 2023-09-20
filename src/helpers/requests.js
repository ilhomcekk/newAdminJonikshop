import axios from 'axios'

// const API = `https://admin.madad-service.uz`
// const API = `http://188.93.210.225:5000`
const API = 'https://api.madad-service.uz'

const formData = (data) => {
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

const token = window.localStorage.getItem('madadToken')

const requests = {
  // Auth
  postSignIn: (params) => axios.post(`${API}/login`, params),
  postUpdateLogin: (params) => axios.put(`${API}/login/update`, params),
  getLogin: (params) => axios.post(`${API}/get/login`, params),
  postRegister: (params) => axios.post(`${API}/register`, params),
  // News
  getNews: (params) => axios.get(`${API}/news`, { params }),
  getDetailNews: (id) => axios.get(`${API}/news/${id}`),
  postCreateNews: (params) => axios.post(`${API}/news/create`, formData(params)),
  postDeleteNews: (id) => axios.delete(`${API}/news/delete/${id}`),
  postUpdateNews: (id, params) => axios.put(`${API}/news/${id}/update`, formData(params)),
  // Offers
  getOffers: (params) => axios.get(`${API}/offers`, { params }),
  getDetailOffers: (id) => axios.get(`${API}/offers/${id}`),
  postCreateOffers: (params) => axios.post(`${API}/offers/create`, formData(params)),
  postDeleteOffers: (id) => axios.delete(`${API}/offers/delete/${id}`),
  postUpdateOffers: (id, params) => axios.put(`${API}/offers/${id}/update`, formData(params)),
  // Advertising
  getAdvertising: (params) => axios.get(`${API}/advertisings`, { params }),
  getDetailAdvertising: (id) => axios.get(`${API}/advertisings/${id}`),
  postCreateAdvertising: (params) => axios.post(`${API}/advertisings/create`, formData(params)),
  postDeleteAdvertising: (id) => axios.delete(`${API}/advertisings/delete/${id}`),
  postUpdateAdvertising: (id, params) =>
    axios.put(`${API}/advertisings/${id}/update`, formData(params)),
  // Partners
  getPartners: (params) => axios.get(`${API}/partners`, { params }),
  getDetailPartners: (id) => axios.get(`${API}/partners/${id}`),
  postCreatePartners: (params) => axios.post(`${API}/partners/create`, formData(params)),
  postDeletePartners: (id) => axios.delete(`${API}/partners/delete/${id}`),
  postUpdatePartners: (id, params) => axios.put(`${API}/partners/${id}/update`, formData(params)),
  // About us
  getAboutUs: (params) => axios.get(`${API}/aboutUs`, { params }),
  getDetailAboutUs: (id) => axios.get(`${API}/aboutUs/${id}`),
  postCreateAboutUs: (params) => axios.post(`${API}/aboutUs/create`, formData(params)),
  postDeleteAboutUs: (id) => axios.delete(`${API}/aboutUs/delete/${id}`),
  postUpdateAboutUs: (id, params) => axios.put(`${API}/aboutUs/${id}/update`, formData(params)),
  // Services
  getServices: (params) => axios.get(`${API}/services`, { params }),
  getServicesByCategory: (id) => axios.get(`${API}/services/category_id/${id}`),
  getDetailServices: (id) => axios.get(`${API}/services/${id}`),
  postCreateServices: (params) => axios.post(`${API}/services/create`, formData(params)),
  postDeleteServices: (id) => axios.delete(`${API}/services/delete/${id}`),
  postUpdateServices: (id, params) => axios.put(`${API}/services/${id}/update`, formData(params)),
  // Tarif
  getTarif: (params) => axios.get(`${API}/tarif`, { params }),
  getTarifByCategory: (id) => axios.get(`${API}/tarif/category_id/${id}`),
  getDetailTarif: (id) => axios.get(`${API}/tarif/${id}`),
  postCreateTarif: (params) => axios.post(`${API}/tarif/create`, params),
  postDeleteTarif: (id) => axios.delete(`${API}/tarif/delete/${id}`),
  postUpdateTarif: (id, params) => axios.put(`${API}/tarif/${id}/update`, params),
  // Tarif Services
  getTarifServices: (params) => axios.get(`${API}/tariffs/services`, { params }),
  getTarifServicesByCategory: (id) => axios.get(`${API}/tariffs/services/category_id/${id}`),
  getDetailTarifServices: (id) => axios.get(`${API}/tariffs/services/${id}`),
  postCreateTarifServices: (params) =>
    axios.post(`${API}/tariffs/services/create`, formData(params)),
  postDeleteTarifServices: (id) => axios.delete(`${API}/tariffs/services/delete/${id}`),
  postUpdateTarifServices: (id, params) =>
    axios.put(`${API}/tariffs/services/${id}/update`, formData(params)),
  // Faq
  getFaq: (params) => axios.get(`${API}/faq`, { params }),
  getDetailFaq: (id) => axios.get(`${API}/faq/${id}`),
  postCreateFaq: (params) => axios.post(`${API}/faq/create`, formData(params)),
  postDeleteFaq: (id) => axios.delete(`${API}/faq/delete/${id}`),
  postUpdateFaq: (id, params) => axios.put(`${API}/faq/${id}/update`, formData(params)),
  // Category
  getCategory: (params) => axios.get(`${API}/category`, { params }),
  getDetailCategory: (id) => axios.get(`${API}/category/${id}`),
  postCreateCategory: (params) => axios.post(`${API}/category/create`, formData(params)),
  postDeleteCategory: (id) => axios.delete(`${API}/category/delete/${id}`),
  postUpdateCategory: (id, params) => axios.put(`${API}/category/${id}/update`, formData(params)),
  // Feedback
  getFeedback: (params) => axios.get(`${API}/feedback`, { params }),
  getDetailFeedback: (id) => axios.get(`${API}/feedback/${id}`),
  postDeleteFeedback: (id) => axios.delete(`${API}/feedback/delete/${id}`),
}

export default requests
