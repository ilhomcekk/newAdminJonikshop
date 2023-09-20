const INITIAL_STATE = {
  partners: [],
  pagination: {},
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_partners_start':
      return { ...state, loading: true, step: false }
    case 'post_create_partners_error':
      return { ...state, loading: false, step: false }
    case 'post_create_partners_success':
      return {
        ...state,
        loading: false,
        step: true,
        partners: [...state.partners, payload.data],
      }

    case 'post_edit_partners_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_partners_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_partners_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_partners_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_partners_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_partners_success':
      return {
        ...state,
        loading: false,
        step: true,
        partners: state.partners.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_partners_start':
      return { ...state, loading: true }
    case 'fetch_detail_partners_error':
      return { ...state, loading: false }
    case 'fetch_detail_partners_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_partners_start':
      return { ...state, loading: true }
    case 'fetch_partners_error':
      return { ...state, loading: false }
    case 'fetch_partners_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        partners: payload.data,
      }

    default:
      return state
  }
}
