import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateTarif = (params) => (dispatch) => {
  dispatch({ type: 'post_create_tariffs_start', payload: params })

  requests
    .postCreateTarif(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_tariffs_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_tariffs_error', payload: response })
    })
}

export const postUpdateTarif = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_tariffs_start', payload: id, params })

  requests
    .postUpdateTarif(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_tariffs_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_tariffs_error', payload: response })
    })
}

export const postDeleteTarif = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_tariffs_start', payload: id })

  requests
    .postDeleteTarif(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_tariffs_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_tariffs_error', payload: response })
    })
}

export const getDetailTarif = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_tariffs_start', payload: id })

  requests
    .getDetailTarif(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_tariffs_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_tariffs_error', payload: response })
    })
}

export const getTarifByCategory = (id) => (dispatch) => {
  dispatch({ type: 'fetch_tariffs_by_category_start', payload: id })

  requests
    .getTarifByCategory(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_tariffs_by_category_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_tariffs_by_category_error', payload: response })
    })
}

export const getTarif = (params) => (dispatch) => {
  dispatch({ type: 'fetch_tariffs_start', payload: params })

  requests
    .getTarif(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_tariffs_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_tariffs_error', payload: response })
    })
}
