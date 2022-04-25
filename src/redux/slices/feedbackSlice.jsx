import { createSlice } from '@reduxjs/toolkit'
import { loadingFetched, loadingFetchingError } from './globalSlice'
import { clearNotifications } from '~/utils/helperFunctions'
import { createFeedbacks as createFeedbacksRequest } from '~/api/feedbackAPI'

const FeedbacksState = {
  error: null,
  fetchingState: 'none',
  creatingState: 'none',
  updatingState: 'none',
  deletingState: 'none',
  loadingState: 'none',
}

const feedbacks = createSlice({
  name: 'feedbacks',
  initialState: FeedbacksState,
  reducers: {
    feedbacksFetching: (state) => {
      state.fetchingState = 'requesting'
    },
    feedbacksFetched: (state, { payload }) => {
      state.fetchingState = 'success'
    },
    feedbacksFetchingError: (state, action) => {
      state.fetchingState = 'failed'
      state.error = action.payload
    },
    feedbacksCreating: (state) => {
      state.creatingState = 'requesting'
    },
    feedbacksCreated: (state, { payload }) => {
      state.creatingState = 'success'
    },
    feedbacksCreatingError: (state, action) => {
      state.creatingState = 'failed'
      state.error = action.payload
    },
  },
})

export const {
  feedbacksFetching,
  feedbacksFetched,
  feedbacksFetchingError,
  feedbacksCreating,
  feedbacksCreated,
  feedbacksCreatingError,
  feedbacksCounted,
} = feedbacks.actions

export default feedbacks.reducer

export const createFeedbacks = (feedbacks) => async (dispatch) => {
  try {
    dispatch(feedbacksCreating())
    const response = await createFeedbacksRequest(feedbacks)
    if (response.success) {
      dispatch(feedbacksCreated(response))
      dispatch(loadingFetched('Thank you for your feedback.'))
    } else {
      dispatch(loadingFetchingError(response.message))
    }
  } catch (err) {
    dispatch(feedbacksCreatingError(err.toString()))
  }
  clearNotifications(dispatch)
}
