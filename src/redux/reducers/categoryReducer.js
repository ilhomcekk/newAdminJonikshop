const INITIAL_STATE = {
  category: [],
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_category_start':
      return { ...state, loading: true, step: false }
    case 'post_create_category_error':
      return { ...state, loading: false, step: false }
    case 'post_create_category_success':
      return {
        ...state,
        loading: false,
        step: true,
        category: [...state.category, payload.data],
      }

    case 'post_edit_category_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_category_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_category_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_category_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_category_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_category_success':
      return {
        ...state,
        loading: false,
        step: true,
        category: state.category.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_category_start':
      return { ...state, loading: true }
    case 'fetch_detail_category_error':
      return { ...state, loading: false }
    case 'fetch_detail_category_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_category_start':
      return { ...state, loading: true }
    case 'fetch_category_error':
      return { ...state, loading: false }
    case 'fetch_category_success':
      return {
        ...state,
        loading: false,
        step: false,
        category: payload.data,
      }

    default:
      return state
  }
}
