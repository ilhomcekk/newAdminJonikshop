import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateFaq = (params) => (dispatch) => {
  dispatch({ type: 'post_create_faq_start', payload: params })

  requests
    .postCreateFaq(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_faq_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_faq_error', payload: response })
    })
}

export const postUpdateFaq = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_faq_start', payload: id, params })

  requests
    .postUpdateFaq(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_faq_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_faq_error', payload: response })
    })
}

export const postDeleteFaq = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_faq_start', payload: id })

  requests
    .postDeleteFaq(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_faq_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_faq_error', payload: response })
    })
}

export const getDetailFaq = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_faq_start', payload: id })

  requests
    .getDetailFaq(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_faq_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_faq_error', payload: response })
    })
}

export const getFaq = (params) => (dispatch) => {
  dispatch({ type: 'fetch_faq_start', payload: params })

  requests
    .getFaq(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_faq_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_faq_error', payload: response })
    })
}
