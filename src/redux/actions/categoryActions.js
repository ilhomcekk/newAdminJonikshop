import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateCategory = (params) => (dispatch) => {
  dispatch({ type: 'post_create_category_start', payload: params })

  requests
    .postCreateCategory(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_category_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_category_error', payload: response })
    })
}

export const postUpdateCategory = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_category_start', payload: id, params })

  requests
    .postUpdateCategory(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_category_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_category_error', payload: response })
    })
}

export const postDeleteCategory = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_category_start', payload: id })

  requests
    .postDeleteCategory(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_category_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_category_error', payload: response })
    })
}

export const getDetailCategory = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_category_start', payload: id })

  requests
    .getDetailCategory(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_category_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_category_error', payload: response })
    })
}

export const getCategory = (params) => (dispatch) => {
  dispatch({ type: 'fetch_category_start', payload: params })

  requests
    .getCategory(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_category_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_category_error', payload: response })
    })
}
