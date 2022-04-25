import AxiosService from '~/services/axiosService'

const apiURL = 'https://nilay.test.tp.gov.tr/api/rtp'
const axiosService = AxiosService.getService()

export async function createFeedbacks(feedbacks) {
  const axios = await axiosService.createAxiosInstance()
  const url = `${apiURL}/Feedbacks`
  const { data } = await axios.post(url, feedbacks)
  return data
}
