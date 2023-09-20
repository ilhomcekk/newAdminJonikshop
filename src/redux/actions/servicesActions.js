import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateServices = (params) => (dispatch) => {
  dispatch({ type: 'post_create_services_start', payload: params })

  requests
    .postCreateServices(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_services_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_services_error', payload: response })
    })
}

export const postUpdateServices = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_services_start', payload: id, params })

  requests
    .postUpdateServices(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_services_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_services_error', payload: response })
    })
}

export const postDeleteServices = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_services_start', payload: id })

  requests
    .postDeleteServices(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_services_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_services_error', payload: response })
    })
}

export const getDetailServices = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_services_start', payload: id })

  requests
    .getDetailServices(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_services_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_services_error', payload: response })
    })
}

export const getServicesByCategory = (id) => (dispatch) => {
  dispatch({ type: 'fetch_services_by_category_start', payload: id })

  requests
    .getServicesByCategory(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_services_by_category_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_services_by_category_error', payload: response })
    })
}

export const getServices = (params) => (dispatch) => {
  dispatch({ type: 'fetch_services_start', payload: params })

  requests
    .getServices(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_services_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_services_error', payload: response })
    })
}
