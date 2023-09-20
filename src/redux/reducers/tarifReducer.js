const INITIAL_STATE = {
  tariffs: [],
  pagination: {},
  tariffsByCategory: [],
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_tariffs_start':
      return { ...state, loading: true, step: false }
    case 'post_create_tariffs_error':
      return { ...state, loading: false, step: false }
    case 'post_create_tariffs_success':
      return {
        ...state,
        loading: false,
        step: true,
        tariffs: [...state.tariffs, payload.data],
      }

    case 'post_edit_tariffs_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_tariffs_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_tariffs_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_tariffs_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_tariffs_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_tariffs_success':
      return {
        ...state,
        loading: false,
        step: true,
        tariffs: state.tariffs.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_tariffs_start':
      return { ...state, loading: true }
    case 'fetch_detail_tariffs_error':
      return { ...state, loading: false }
    case 'fetch_detail_tariffs_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_tariffs_by_category_start':
      return { ...state, loading: true }
    case 'fetch_tariffs_by_category_error':
      return { ...state, loading: false }
    case 'fetch_tariffs_by_category_success':
      return {
        ...state,
        loading: false,
        tariffsByCategory: payload.data,
      }

    case 'fetch_tariffs_start':
      return { ...state, loading: true }
    case 'fetch_tariffs_error':
      return { ...state, loading: false }
    case 'fetch_tariffs_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        tariffs: payload.data,
      }

    default:
      return state
  }
}
