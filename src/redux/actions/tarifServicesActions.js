import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateTarifServices = (params) => (dispatch) => {
  dispatch({ type: 'post_create_tariffs_services_start', payload: params })

  requests
    .postCreateTarifServices(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_tariffs_services_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_tariffs_services_error', payload: response })
    })
}

export const postUpdateTarifServices = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_tariffs_services_start', payload: id, params })

  requests
    .postUpdateTarifServices(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_tariffs_services_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_tariffs_services_error', payload: response })
    })
}

export const postDeleteTarifServices = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_tariffs_services_start', payload: id })

  requests
    .postDeleteTarifServices(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_tariffs_services_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_tariffs_services_error', payload: response })
    })
}

export const getDetailTarifServices = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_tariffs_services_start', payload: id })

  requests
    .getDetailTarifServices(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_tariffs_services_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_tariffs_services_error', payload: response })
    })
}

export const getTarifServicesByCategory = (id) => (dispatch) => {
  dispatch({ type: 'fetch_tariffs_services_by_category_start', payload: id })

  requests
    .getTarifServicesByCategory(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_tariffs_services_by_category_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_tariffs_services_by_category_error', payload: response })
    })
}

export const getTarifServices = (params) => (dispatch) => {
  dispatch({ type: 'fetch_tariffs_services_start', payload: params })

  requests
    .getTarifServices(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_tariffs_services_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_tariffs_services_error', payload: response })
    })
}
