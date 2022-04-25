import AxiosService from '~/services/axiosService'

//const apiURL = 'https://nilay.test.tp.gov.tr/api/rtp'
const apiURL = 'https://localhost:44338/api/rtp'
const axiosService = AxiosService.getService()

export async function createAthlete(athlete) {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/Athlete`
  const { data } = await axios.post(url, athlete)
  return data
}

export async function getAthletes() {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/Athletes`
  const { data } = await axios.get(url)
  return data
}
