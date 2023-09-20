import { combineReducers } from 'redux'
import aboutUsReducer from './aboutUsReducer'
import advertisingReducer from './advertisingReducer'
import authReducer from './authReducer'
import categoryReducer from './categoryReducer'
import contentReducer from './contentReducer'
import faqReducer from './faqReducer'
import feedbackReducer from './feedbackReducer'
import newsReducer from './newsReducer'
import offersReducer from './offersReducer'
import partnersReducer from './partnersReducer'
import servicesReducer from './servicesReducer'
import tarifReducer from './tarifReducer'
import tarifServicesReducer from './tarifServicesReducer'

const reducer = combineReducers({
  content: contentReducer,
  auth: authReducer,
  news: newsReducer,
  offers: offersReducer,
  advertising: advertisingReducer,
  partners: partnersReducer,
  aboutUs: aboutUsReducer,
  services: servicesReducer,
  faq: faqReducer,
  category: categoryReducer,
  feedback: feedbackReducer,
  tarif: tarifReducer,
  tarifServices: tarifServicesReducer,
})

export default reducer
