const INITIAL_STATE = {
  faq: [],
  pagination: {},
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_faq_start':
      return { ...state, loading: true, step: false }
    case 'post_create_faq_error':
      return { ...state, loading: false, step: false }
    case 'post_create_faq_success':
      return {
        ...state,
        loading: false,
        step: true,
        faq: [...state.faq, payload.data],
      }

    case 'post_edit_faq_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_faq_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_faq_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_faq_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_faq_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_faq_success':
      return {
        ...state,
        loading: false,
        step: true,
        faq: state.faq.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_faq_start':
      return { ...state, loading: true }
    case 'fetch_detail_faq_error':
      return { ...state, loading: false }
    case 'fetch_detail_faq_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_faq_start':
      return { ...state, loading: true }
    case 'fetch_faq_error':
      return { ...state, loading: false }
    case 'fetch_faq_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        faq: payload.data,
      }

    default:
      return state
  }
}
