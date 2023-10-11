import axios from 'axios'

const API_URL = 'https://admin.jonikshop.uz'

const $api = axios.create({
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jonikshopAccessToken')
  if (!token) return config
  config.headers.Authorization = `Bearer ${token}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        // const refreshToken = getCookie('refreshToken')
        // const response = await $api.post('api/v1/token/refresh/', {
        //   refresh: refreshToken,
        // })
        // localStorage.setItem('jonikshopAccessToken', response.data.access)
        return $api.request(originalRequest)
      } catch (error) {
        // setCookie('refreshToken', '', 0)
        localStorage.removeItem('jonikshopAccessToken')
        console.error(error)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)

export default $api
