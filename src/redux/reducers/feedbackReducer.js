const INITIAL_STATE = {
  feedback: [],
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_delete_feedback_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_feedback_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_feedback_success':
      return {
        ...state,
        loading: false,
        step: true,
        feedback: state.feedback.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_feedback_start':
      return { ...state, loading: true }
    case 'fetch_detail_feedback_error':
      return { ...state, loading: false }
    case 'fetch_detail_feedback_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_feedback_start':
      return { ...state, loading: true }
    case 'fetch_feedback_error':
      return { ...state, loading: false }
    case 'fetch_feedback_success':
      return {
        ...state,
        loading: false,
        step: false,
        feedback: payload.data,
      }

    default:
      return state
  }
}
