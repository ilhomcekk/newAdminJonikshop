const INITIAL_STATE = {
  advertising: [],
  pagination: {},
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_advertising_start':
      return { ...state, loading: true, step: false }
    case 'post_create_advertising_error':
      return { ...state, loading: false, step: false }
    case 'post_create_advertising_success':
      return {
        ...state,
        loading: false,
        step: true,
        advertising: [...state.advertising, payload.data],
      }

    case 'post_edit_advertising_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_advertising_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_advertising_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_advertising_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_advertising_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_advertising_success':
      return {
        ...state,
        loading: false,
        step: true,
        advertising: state.advertising.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_advertising_start':
      return { ...state, loading: true }
    case 'fetch_detail_advertising_error':
      return { ...state, loading: false }
    case 'fetch_detail_advertising_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_advertising_start':
      return { ...state, loading: true }
    case 'fetch_advertising_error':
      return { ...state, loading: false }
    case 'fetch_advertising_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        advertising: payload.data,
      }

    default:
      return state
  }
}
