const INITIAL_STATE = {
  sidebarShow: true,
}

export default (state = INITIAL_STATE, { type, ...rest }) => {
  switch (type) {
    case 'change_content':
      return { ...state, ...rest }
    default:
      return state
  }
}
