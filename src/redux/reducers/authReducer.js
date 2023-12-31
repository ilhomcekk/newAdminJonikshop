const INITIAL_STATE = {
  profile: {},
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'get_profile':
      return {
        ...state,
        profile: payload,
      }

    default:
      return state
  }
}
