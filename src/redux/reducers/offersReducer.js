const INITIAL_STATE = {
  offers: [],
  pagination: {},
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_offers_start':
      return { ...state, loading: true, step: false }
    case 'post_create_offers_error':
      return { ...state, loading: false, step: false }
    case 'post_create_offers_success':
      return {
        ...state,
        loading: false,
        step: true,
        offers: [...state.offers, payload.data],
      }

    case 'post_edit_offers_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_offers_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_offers_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_offers_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_offers_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_offers_success':
      return {
        ...state,
        loading: false,
        step: true,
        offers: state.offers.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_offers_start':
      return { ...state, loading: true }
    case 'fetch_detail_offers_error':
      return { ...state, loading: false }
    case 'fetch_detail_offers_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_offers_start':
      return { ...state, loading: true }
    case 'fetch_offers_error':
      return { ...state, loading: false }
    case 'fetch_offers_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        offers: payload.data,
      }

    default:
      return state
  }
}
