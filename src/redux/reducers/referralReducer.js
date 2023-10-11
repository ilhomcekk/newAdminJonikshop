const INITIAL_STATE = {
  referralStatistics: [],
  allReferralStatistics: [],
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'get_stream_order_statistic':
      return {
        ...state,
        referralStatistics: payload,
      }

    case 'get_stream_order_total':
      return {
        ...state,
        allReferralStatistics: payload,
      }

    default:
      return state
  }
}
