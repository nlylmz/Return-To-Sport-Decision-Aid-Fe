import { combineReducers } from '@reduxjs/toolkit'

import athleteReducer from './slices/athleteSlice'
import feedbacksReducer from './slices/feedbackSlice'
import athleteCriteriaReducer from './slices/athleteCriteriaSlice'
import globalReducer from './slices/globalSlice'

const rootReducer = combineReducers({
  global: globalReducer,
  athlete: athleteReducer,
  athleteCriteria: athleteCriteriaReducer,
  feedbacks: feedbacksReducer,
})

export default rootReducer
