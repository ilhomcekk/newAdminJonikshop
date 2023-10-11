import $api from 'src/helpers/createApi'
import { formData } from 'src/helpers/requests'

export const createPayAdmin = async (params) => {
  try {
    const response = await $api.post('/user/create-application-admin/', formData(params))
    return response
  } catch (err) {
    console.log(err)
  }
}
