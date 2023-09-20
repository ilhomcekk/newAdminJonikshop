import { toast } from 'react-toastify'
import requests from 'src/helpers/requests'

export const postDeleteFeedback = (id) => (dispatch) => {
  dispatch({ type: 'post_delete_feedback_start', payload: id })

  requests
    .postDeleteFeedback(id)
    .then(({ data }) => {
      dispatch({ type: 'post_delete_feedback_success', payload: data })
      toast.success('Успешно удалено')
    })
    .catch(({ response }) => {
      dispatch({ type: 'post_delete_feedback_error', payload: response })
    })
}

export const getDetailFeedback = (id) => (dispatch) => {
  dispatch({ type: 'fetch_detail_feedback_start', payload: id })

  requests
    .getDetailFeedback(id)
    .then(({ data }) => {
      dispatch({ type: 'fetch_detail_feedback_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_detail_feedback_error', payload: response })
    })
}

export const getFeedback = (params) => (dispatch) => {
  dispatch({ type: 'fetch_feedback_start', payload: params })

  requests
    .getFeedback(params)
    .then(({ data }) => {
      dispatch({ type: 'fetch_feedback_success', payload: data })
    })
    .catch(({ response }) => {
      dispatch({ type: 'fetch_feedback_error', payload: response })
    })
}
