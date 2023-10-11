const INITIAL_STATE = {
  orders: [],
  orderStatisctics: [],
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'get_orders':
      return {
        ...state,
        orders: payload,
      }
    case 'get_order_statistic':
      return {
        ...state,
        orderStatisctics: payload,
      }

    default:
      return state
  }
}
