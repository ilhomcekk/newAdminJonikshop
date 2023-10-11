const INITIAL_STATE = {
  marketProducts: [],
  streamProducts: [],
  popularProducts: [],
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'get_popular_products':
      return {
        ...state,
        popularProducts: payload,
      }

    case 'get_market_products':
      return {
        ...state,
        marketProducts: payload,
      }

    case 'get_stream_products':
      return {
        ...state,
        streamProducts: payload,
      }

    default:
      return state
  }
}
