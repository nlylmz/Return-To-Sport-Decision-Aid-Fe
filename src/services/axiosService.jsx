import axios from 'axios'

const AxiosService = (function () {
  var _service
  function _getService() {
    if (!_service) {
      _service = this
      return _service
    }
    return _service
  }
  async function _createAxiosInstance() {
    const axiosInstance = axios.create({
      headers: {},
    })

    axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      (error) => {
        Promise.reject(error)
      },
    )
    //Add a response interceptor
    axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      //Hata ile karşılaşırsam hatayı handle ediyorum. 401/403 hatası alıyorsam tokenim expire olmuş yada tokenim yok demektir. Bu yüzden 401/403 hatası alınan istegi yeni alacagim access token ile tekrar calistirmaliyim.
      //Interceptor response methodu ilk yapilan istegin response kısmı. Yani burada 401/403 durumu kontrol etmeliyim.
    )
    return axiosInstance
    //redisten gelen access tokeni axios objemin authorization ayarlarına veriyorum.
  }
  return {
    getService: _getService,
    createAxiosInstance: _createAxiosInstance,
  }
})()

export default AxiosService
