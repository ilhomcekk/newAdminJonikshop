import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postCreateNews = (params) => (dispatch) => {
  dispatch({ type: 'post_create_news_start', payload: params })

  requests
    .postCreateNews(params)
    .then(({ data }) => {
      dispatch({ type: 'post_create_news_success', payload: data })
      toast.success('Успешно добавлено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_create_news_error', payload: response })
    })
}

export const postUpdateNews = (id, params) => (dispatch) => {
  dispatch({ type: 'post_edit_news_start', payload: id, params })

  requests
    .postUpdateNews(id, params)
    .then(({ data }) => {
      dispatch({ type: 'post_edit_news_success', payload: data })
      toast.success('Успешно изменено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_edit_news_error', payload: response })
    })
}

export const postDeleteNews = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_news_start', payload: id })

  requests
    .postDeleteNews(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_news_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_news_error', payload: response })
    })
}

export const getDetailNews = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_news_start', payload: id })

  requests
    .getDetailNews(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_news_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_news_error', payload: response })
    })
}

export const getNews = (params) => (dispatch) => {
  dispatch({ type: 'fetch_news_start', payload: params })

  requests
    .getNews(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_news_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_news_error', payload: response })
    })
}
