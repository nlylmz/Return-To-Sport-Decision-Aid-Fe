import { createSlice } from '@reduxjs/toolkit'
import { loadingFetched, loadingFetchingError } from './globalSlice'
import { clearNotifications } from '~/utils/helperFunctions'
import {
  createAthleteCriteria as createAthleteCriteriaRequest,
  createAthleteCriteriaValue as createAthleteCriteriaValueRequest,
  getAthletesCriteria as getAthletesCriteriaRequest,
  createOptionsEvaluation as createOptionsEvaluationRequest,
} from '~/api/athleteCriteriaAPI'

const AthleteCriteriaState = {
  combinedCriteria: [],
  combinedOptions: [],
  optionsWeight: [],
  crtWeight: [],
  criteriaName: [],
  result: [],
  athelete: [],
  crtCount: null,
  optcrtWeights: [],
  athleteId: null,
  criteriaValue: [],
  error: null,
  fetchingState: 'none',
  creatingState: 'none',
  updatingState: 'none',
  deletingState: 'none',
  loadingState: 'none',
}

const athleteCriteria = createSlice({
  name: 'athleteCriteria',
  initialState: AthleteCriteriaState,
  reducers: {
    athleteCriteriaFetching: (state) => {
      state.fetchingState = 'requesting'
    },
    athleteCriteriaFetched: (state, { payload }) => {
      state.fetchingState = 'success'
      state.athleteCriteria = payload
    },
    athleteCriteriaFetchingError: (state, action) => {
      state.fetchingState = 'failed'
      state.error = action.payload
    },
    athleteCriteriaCreating: (state) => {
      state.creatingState = 'requesting'
    },
    athleteCriteriaCreated: (state, { payload }) => {
      state.creatingState = 'success'
      state.combinedCriteria = payload.combinationCriteriaList
      state.athleteId = payload.athleteId
    },
    athleteCriteriaCreatingError: (state, action) => {
      state.creatingState = 'failed'
      state.error = action.payload
    },
    criteriaValueCreating: (state) => {
      state.creatingState = 'requesting'
    },
    criteriaValueCreated: (state, { payload }) => {
      state.creatingState = 'success'
      state.criteriaWeight = payload.orderedCrtWeight
    },
    criteriaValueCreatingError: (state, action) => {
      state.creatingState = 'failed'
      state.error = action.payload
    },
    criteriaFetching: (state) => {
      state.fetchingState = 'requesting'
    },
    criteriaFetched: (state, { payload }) => {
      state.fetchingState = 'success'
      state.athleteId = payload.athleteId
      state.combinedOptions = payload.combinationOptionsList
    },
    criteriaFetchingError: (state, action) => {
      state.fetchingState = 'failed'
      state.error = action.payload
    },
    optionsEvaluationCreating: (state) => {
      state.creatingState = 'requesting'
    },
    optionsEvaluationCreated: (state, { payload }) => {
      state.creatingState = 'success'
      state.criteriaWeight = payload.orderedCrtWeight
      state.result = payload.optResult
      state.crtWeight = payload.crtWeight
      state.optcrtWeights = payload.optcrtWeights
      state.crtCount = payload.crtCount
      state.athelete = payload.athelete
    },
    optionsEvaluationCreatingError: (state, action) => {
      state.creatingState = 'failed'
      state.error = action.payload
    },
  },
})

export const {
  athleteCriteriaFetching,
  athleteCriteriaFetched,
  athleteCriteriaFetchingError,
  athleteCriteriaCreating,
  athleteCriteriaCreated,
  athleteCriteriaCreatingError,
  criteriaValueCreating,
  criteriaValueCreated,
  criteriaValueCreatingError,
  criteriaFetched,
  criteriaFetching,
  criteriaFetchingError,
  optionsEvaluationCreating,
  optionsEvaluationCreated,
  optionsEvaluationCreatingError,
} = athleteCriteria.actions

export default athleteCriteria.reducer

export const createAthleteCriteria = (athleteCriteria) => async (dispatch) => {
  try {
    dispatch(athleteCriteriaCreating())
    console.log(athleteCriteria)
    const response = await createAthleteCriteriaRequest(athleteCriteria)
    if (response.success) {
      dispatch(athleteCriteriaCreated(response))
      dispatch(loadingFetched('Your data is saved. Please click Next button.'))
    } else {
      dispatch(loadingFetchingError(response.message))
    }
  } catch (err) {
    dispatch(athleteCriteriaCreatingError(err.toString()))
  }
  clearNotifications(dispatch)
}

export const createAthleteCriteriaValue = (criteriaValue) => async (
  dispatch,
) => {
  try {
    dispatch(criteriaValueCreating())
    console.log(criteriaValue)
    const response = await createAthleteCriteriaValueRequest(criteriaValue)
    if (response.success) {
      dispatch(criteriaValueCreated(response))
      dispatch(loadingFetched('Your data is saved. Please click Next button.'))
    } else {
      dispatch(loadingFetchingError(response.message))
    }
  } catch (err) {
    dispatch(criteriaValueCreatingError(err.toString()))
  }
  clearNotifications(dispatch)
}

export const getAthletesCriteria = (athleteId) => async (dispatch) => {
  try {
    dispatch(criteriaFetching())
    const response = await getAthletesCriteriaRequest(athleteId)
    if (response.success) {
      dispatch(criteriaFetched(response))
      dispatch(
        loadingFetched('The process is successful. Please click Next button.'),
      )
    } else {
      dispatch(criteriaFetchingError(response.message))
    }
  } catch (err) {
    dispatch(loadingFetchingError(err.toString()))
  }
  clearNotifications(dispatch)
}

export const createOptionsEvaluation = (optionsEvaluation) => async (
  dispatch,
) => {
  try {
    dispatch(optionsEvaluationCreating())
    console.log(optionsEvaluation)
    const response = await createOptionsEvaluationRequest(optionsEvaluation)
    if (response.success) {
      dispatch(optionsEvaluationCreated(response))
      console.log(response)
      dispatch(loadingFetched('Your data is saved. Please click Next button.'))
    } else {
      dispatch(loadingFetchingError(response.message))
    }
  } catch (err) {
    dispatch(optionsEvaluationCreatingError(err.toString()))
  }
  clearNotifications(dispatch)
}
