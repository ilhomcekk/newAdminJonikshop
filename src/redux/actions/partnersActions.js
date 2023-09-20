import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreatePartners = (params) => (dispatch) => {
  dispatch({ type: 'post_create_partners_start', payload: params })

  requests
    .postCreatePartners(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_partners_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_partners_error', payload: response })
    })
}

export const postUpdatePartners = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_partners_start', payload: id, params })

  requests
    .postUpdatePartners(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_partners_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_partners_error', payload: response })
    })
}

export const postDeletePartners = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_partners_start', payload: id })

  requests
    .postDeletePartners(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_partners_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_partners_error', payload: response })
    })
}

export const getDetailPartners = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_partners_start', payload: id })

  requests
    .getDetailPartners(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_partners_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_partners_error', payload: response })
    })
}

export const getPartners = (params) => (dispatch) => {
  dispatch({ type: 'fetch_partners_start', payload: params })

  requests
    .getPartners(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_partners_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_partners_error', payload: response })
    })
}
