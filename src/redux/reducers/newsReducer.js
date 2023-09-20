const INITIAL_STATE = {
  news: [],
  pagination: {},
  data: {},
  loading: false,
  step: false,
}

export default (state = INITIAL_STATE, { type, payload, ...rest }) => {
  switch (type) {
    case 'post_create_news_start':
      return { ...state, loading: true, step: false }
    case 'post_create_news_error':
      return { ...state, loading: false, step: false }
    case 'post_create_news_success':
      return {
        ...state,
        loading: false,
        step: true,
        news: [...state.news, payload.data],
      }

    case 'post_edit_news_start':
      return { ...state, loading: true, step: false }
    case 'post_edit_news_error':
      return { ...state, loading: false, step: false }
    case 'post_edit_news_success':
      return {
        ...state,
        loading: false,
        step: true,
      }

    case 'post_delete_news_start':
      return { ...state, loading: true, step: false }
    case 'post_delete_news_error':
      return { ...state, loading: false, step: false }
    case 'post_delete_news_success':
      return {
        ...state,
        loading: false,
        step: true,
        news: state.news.filter((item) => item._id !== payload.data._id),
      }

    case 'fetch_detail_news_start':
      return { ...state, loading: true }
    case 'fetch_detail_news_error':
      return { ...state, loading: false }
    case 'fetch_detail_news_success':
      return {
        ...state,
        loading: false,
        data: payload.data,
      }

    case 'fetch_news_start':
      return { ...state, loading: true }
    case 'fetch_news_error':
      return { ...state, loading: false }
    case 'fetch_news_success':
      return {
        ...state,
        loading: false,
        step: false,
        pagination: payload._meta,
        news: payload.data,
      }

    default:
      return state
  }
}
