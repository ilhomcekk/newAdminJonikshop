import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateAboutUs = (params) => (dispatch) => {
  dispatch({ type: 'post_create_aboutUs_start', payload: params })

  requests
    .postCreateAboutUs(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_aboutUs_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_aboutUs_error', payload: response })
    })
}

export const postUpdateAboutUs = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_aboutUs_start', payload: id, params })

  requests
    .postUpdateAboutUs(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_aboutUs_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_aboutUs_error', payload: response })
    })
}

export const postDeleteAboutUs = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_aboutUs_start', payload: id })

  requests
    .postDeleteAboutUs(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_aboutUs_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_aboutUs_error', payload: response })
    })
}

export const getDetailAboutUs = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_aboutUs_start', payload: id })

  requests
    .getDetailAboutUs(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_aboutUs_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_aboutUs_error', payload: response })
    })
}

export const getAboutUs = (params) => (dispatch) => {
  dispatch({ type: 'fetch_aboutUs_start', payload: params })

  requests
    .getAboutUs(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_aboutUs_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_aboutUs_error', payload: response })
    })
}
