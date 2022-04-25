import { createSlice } from '@reduxjs/toolkit'
import { loadingFetched, loadingFetchingError } from './globalSlice'
import { clearNotifications } from '~/utils/helperFunctions'
import {
  createAthlete as createAthleteRequest,
  getAthletes as getAthletesRequest,
} from '~/api/athleteAPI'

const AthletesState = {
  athleteList: [],
  firstName: '',
  lastName: '',
  scenario: '',
  athleteId: null,
  error: null,
  fetchingState: 'none',
  creatingState: 'none',
  updatingState: 'none',
  deletingState: 'none',
  loadingState: 'none',
}

const athletes = createSlice({
  name: 'athletes',
  initialState: AthletesState,
  reducers: {
    athletesFetching: (state) => {
      state.fetchingState = 'requesting'
    },
    athletesFetched: (state, { payload }) => {
      state.fetchingState = 'success'
      state.athleteList = payload.athletes
    },
    athletesFetchingError: (state, action) => {
      state.fetchingState = 'failed'
      state.error = action.payload
    },
    athleteCreating: (state) => {
      state.creatingState = 'requesting'
    },
    athleteCreated: (state, { payload }) => {
      state.creatingState = 'success'
      state.firstName = payload.newPatient.firstName
      state.lastName = payload.newPatient.lastName
      state.athleteId = payload.newPatient.id
      state.scenario = payload.newPatient.detail
      //state.athletes.push(payload)
    },
    athleteCreatingError: (state, action) => {
      state.creatingState = 'failed'
      state.error = action.payload
    },
  },
})

export const {
  athletesFetching,
  athletesFetched,
  athletesFetchingError,
  athleteCreating,
  athleteCreated,
  athleteCreatingError,
  athleteCounted,
} = athletes.actions

export default athletes.reducer

export const createAthlete = (athlete) => async (dispatch) => {
  try {
    dispatch(athleteCreating())
    const response = await createAthleteRequest(athlete)
    if (response.success) {
      dispatch(athleteCreated(response))
      dispatch(loadingFetched('Your data is saved. Please click Next button.'))
    } else {
      dispatch(loadingFetchingError(response.message))
    }
  } catch (err) {
    dispatch(athleteCreatingError(err.toString()))
  }
  clearNotifications(dispatch)
}

export const getAthletes = () => async (dispatch) => {
  try {
    dispatch(athletesFetching())
    const response = await getAthletesRequest()
    if (response.success) {
      dispatch(athletesFetched(response))
    } else {
      dispatch(athletesFetchingError(response.message))
    }
  } catch (err) {
    dispatch(loadingFetchingError(err.toString()))
  }
  clearNotifications(dispatch)
}
