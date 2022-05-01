import AxiosService from '~/services/axiosService'

const apiURL = 'https://localhost:44338/api/rtp'
const axiosService = AxiosService.getService()

export async function createAthleteCriteria(athleteCriteria) {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/AthleteCriteria`
  //console.log(athleteCriteria)
  const { data } = await axios.post(url, athleteCriteria)
  return data
}

export async function createAthleteCriteriaValue(criteriaValue) {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/AthleteCriteriaValue`
  const { data } = await axios.post(url, criteriaValue)
  return data
}

export async function getAthletesCriteria(athleteId) {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/AthletesCriteria/${athleteId}`
  try {
    const criteria = await axios.get(url)
    return criteria.data
  } catch (err) {
    throw err
  }
}

export async function createOptionsEvaluation(optionsEvaluation) {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/OptionsEvaluation`
  const { data } = await axios.post(url, optionsEvaluation)
  return data
}

export async function getDashboardResult(athleteId) {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/DashboardResult/${athleteId}`
  try {
    const criteria = await axios.get(url)
    return criteria.data
  } catch (err) {
    throw err
  }
}
