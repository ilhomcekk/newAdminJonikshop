const INITIAL_STATE = {
  services: [],
  pagination: {},
  servicesByCategory: [],
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_services_start':
      return { ...state, loading: true, step: false }
    case 'post_create_services_error':
      return { ...state, loading: false, step: false }
    case 'post_create_services_success':
      return {
        ...state,
        loading: false,
        step: true,
        services: [...state.services, payload.data],
      }

    case 'post_edit_services_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_services_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_services_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_services_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_services_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_services_success':
      return {
        ...state,
        loading: false,
        step: true,
        services: state.services.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_services_start':
      return { ...state, loading: true }
    case 'fetch_detail_services_error':
      return { ...state, loading: false }
    case 'fetch_detail_services_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_services_by_category_start':
      return { ...state, loading: true }
    case 'fetch_services_by_category_error':
      return { ...state, loading: false }
    case 'fetch_services_by_category_success':
      return {
        ...state,
        loading: false,
        servicesByCategory: payload.data,
      }

    case 'fetch_services_start':
      return { ...state, loading: true }
    case 'fetch_services_error':
      return { ...state, loading: false }
    case 'fetch_services_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        services: payload.data,
      }

    default:
      return state
  }
}
