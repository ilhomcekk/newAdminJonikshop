const INITIAL_STATE = {
  aboutUs: [],
  pagination: {},
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_aboutUs_start':
      return { ...state, loading: true, step: false }
    case 'post_create_aboutUs_error':
      return { ...state, loading: false, step: false }
    case 'post_create_aboutUs_success':
      return {
        ...state,
        loading: false,
        step: true,
        aboutUs: [...state.aboutUs, payload.data],
      }

    case 'post_edit_aboutUs_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_aboutUs_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_aboutUs_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_aboutUs_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_aboutUs_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_aboutUs_success':
      return {
        ...state,
        loading: false,
        step: true,
        aboutUs: state.aboutUs.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_aboutUs_start':
      return { ...state, loading: true }
    case 'fetch_detail_aboutUs_error':
      return { ...state, loading: false }
    case 'fetch_detail_aboutUs_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_aboutUs_start':
      return { ...state, loading: true }
    case 'fetch_aboutUs_error':
      return { ...state, loading: false }
    case 'fetch_aboutUs_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        aboutUs: payload.data,
      }

    default:
      return state
  }
}
