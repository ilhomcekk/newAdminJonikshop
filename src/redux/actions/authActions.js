import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postSignIn = (params) => (dispatch) => {
  dispatch({ type: 'post_sign_in_start', payload: params })

  requests
    .postSignIn(params)
    .then(({ data }) => {
      dispatch({ type: 'post_sign_in_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_sign_in_error', payload: response })
    })
}

export const postUpdateLogin = (params) => (dispatch) => {
  dispatch({ type: 'post_update_login_start', payload: params })

  requests
    .postUpdateLogin(params)
    .then(({ data }) => {
      dispatch({ type: 'post_update_login_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_update_login_error', payload: response })
    })
}

export const getLogin = (params) => (dispatch) => {
  dispatch({ type: 'fetch_login_start', payload: params })

  requests
    .getLogin(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_login_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_login_error', payload: response })
    })
}

export const postRegister = (params) => (dispatch) => {
  dispatch({ type: 'post_register_start', payload: params })

  requests
    .postRegister(params)
    .then(({ data }) => {
      dispatch({ type: 'post_register_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_register_error', payload: response })
    })
}

export const setSuccess = () => (dispatch) => {
  dispatch({ type: 'set_success' })
}

export const setStep = () => (dispatch) => {
  dispatch({ type: 'set_step' })
}

export const logout = () => (dispatch) => {
  dispatch({ type: 'logout' })
}
