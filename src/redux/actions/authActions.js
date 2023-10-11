import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postSignIn = async (params) => {
  try {
    const response = await requests.postSignIn(params)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const postRegister = async (params) => {
  try {
    const response = await requests.postRegister(params)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const getProfile = () => async (dispatch) => {
  try {
    const response = await requests.getProfile()
    dispatch({ type: 'get_profile', payload: response })
  } catch (err) {
    console.log(err)
  }
}

export const updateProfile = async (params) => {
  try {
    const response = await requests.updateProfile(params)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const updateProfilePatch = async (params) => {
  try {
    const response = await requests.updateProfilePatch(params)
    return response
  } catch (err) {
    console.log(err)
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jonikshopAccessToken')
  }
}
