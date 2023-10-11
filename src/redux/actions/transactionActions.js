import requests from 'src/helpers/requests'

export const getTransactionAdmin = (params) => async (dispatch) => {
  try {
    const response = await requests.getTransactionAdmin(params)
    dispatch({ type: 'get_transaction_admin', payload: response })
  } catch (err) {
    console.log(err)
  }
}
