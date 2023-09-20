const INITIAL_STATE = {
  tariffsServices: [],
  pagination: {},
  tariffsServicesByCategory: [],
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_tariffs_services_start':
      return { ...state, loading: true, step: false }
    case 'post_create_tariffs_services_error':
      return { ...state, loading: false, step: false }
    case 'post_create_tariffs_services_success':
      return {
        ...state,
        loading: false,
        step: true,
        tariffsServices: [...state.tariffsServices, payload.data],
      }

    case 'post_edit_tariffs_services_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_tariffs_services_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_tariffs_services_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_tariffs_services_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_tariffs_services_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_tariffs_services_success':
      return {
        ...state,
        loading: false,
        step: true,
        tariffsServices: state.tariffsServices.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_tariffs_services_start':
      return { ...state, loading: true }
    case 'fetch_detail_tariffs_services_error':
      return { ...state, loading: false }
    case 'fetch_detail_tariffs_services_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_tariffs_services_by_category_start':
      return { ...state, loading: true }
    case 'fetch_tariffs_services_by_category_error':
      return { ...state, loading: false }
    case 'fetch_tariffs_services_by_category_success':
      return {
        ...state,
        loading: false,
        tariffsServicesByCategory: payload.data,
      }

    case 'fetch_tariffs_services_start':
      return { ...state, loading: true }
    case 'fetch_tariffs_services_error':
      return { ...state, loading: false }
    case 'fetch_tariffs_services_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        tariffsServices: payload.data,
      }

    default:
      return state
  }
}
