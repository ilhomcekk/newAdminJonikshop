const INITIAL_STATE = { transactionAdmin: [] }

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'get_transaction_admin':
      return {
        ...state,
        transactionAdmin: payload,
      }

    default:
      return state
  }
}
