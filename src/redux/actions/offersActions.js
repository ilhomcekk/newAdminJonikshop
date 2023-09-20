import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateOffers = (params) => (dispatch) => {
  dispatch({ type: 'post_create_offers_start', payload: params })

  requests
    .postCreateOffers(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_offers_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_offers_error', payload: response })
    })
}

export const postUpdateOffers = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_offers_start', payload: id, params })

  requests
    .postUpdateOffers(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_offers_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_offers_error', payload: response })
    })
}

export const postDeleteOffers = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_offers_start', payload: id })

  requests
    .postDeleteOffers(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_offers_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_offers_error', payload: response })
    })
}

export const getDetailOffers = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_offers_start', payload: id })

  requests
    .getDetailOffers(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_offers_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_offers_error', payload: response })
    })
}

export const getOffers = (params) => (dispatch) => {
  dispatch({ type: 'fetch_offers_start', payload: params })

  requests
    .getOffers(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_offers_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_offers_error', payload: response })
    })
}
