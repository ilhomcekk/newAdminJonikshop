const INITIAL_STATE = {
  success: null,
  loading: false,
  step: false,
  user: null,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_sign_in_start':
      return { ...state, loading: true, step: false }
    case 'post_sign_in_error':
      return { ...state, loading: false, step: false, success: payload.success }
    case 'post_sign_in_success':
      window.localStorage.setItem('madadToken', payload.token)
      return {
        ...state,
        loading: false,
        step: true,
        success: payload.success,
      }

    case 'post_update_login_start':
      return { ...state, loading: true }
    case 'post_update_login_error':
      return { ...state, loading: false, success: payload.success }
    case 'post_update_login_success':
      return {
        ...state,
        loading: false,
        step: true,
        success: payload.success,
      }

    case 'fetch_login_start':
      return { ...state, loading: true }
    case 'fetch_login_error':
      return { ...state, loading: false }
    case 'fetch_login_success':
      return {
        ...state,
        loading: false,
        success: payload.success,
        user: payload,
      }

    case 'post_register_start':
      return { ...state, loading: true }
    case 'post_register_error':
      return { ...state, loading: false }
    case 'post_register_success':
      return {
        ...state,
        loading: false,
      }

    case 'set_success':
      return {
        ...state,
        success: false,
      }

    case 'set_step':
      return {
        ...state,
        step: false,
      }

    case 'logout':
      window.localStorage.removeItem('madadToken')
      return {
        ...state,
        success: false,
      }

    default:
      return state
  }
}
