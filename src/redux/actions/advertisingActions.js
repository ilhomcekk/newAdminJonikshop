import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateAdvertising = (params) => (dispatch) => {
  dispatch({ type: 'post_create_advertising_start', payload: params })

  requests
    .postCreateAdvertising(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_advertising_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_advertising_error', payload: response })
    })
}

export const postUpdateAdvertising = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_advertising_start', payload: id, params })

  requests
    .postUpdateAdvertising(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_advertising_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_advertising_error', payload: response })
    })
}

export const postDeleteAdvertising = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_advertising_start', payload: id })

  requests
    .postDeleteAdvertising(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_advertising_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_advertising_error', payload: response })
    })
}

export const getDetailAdvertising = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_advertising_start', payload: id })

  requests
    .getDetailAdvertising(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_advertising_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_advertising_error', payload: response })
    })
}

export const getAdvertising = (params) => (dispatch) => {
  dispatch({ type: 'fetch_advertising_start', payload: params })

  requests
    .getAdvertising(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_advertising_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_advertising_error', payload: response })
    })
}
