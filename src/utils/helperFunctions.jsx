import { clearError, clearSuccess } from '~/redux/slices/globalSlice'

const clearNotifications = (dispatch) => {
  setTimeout(() => {
    dispatch(clearSuccess())
    dispatch(clearError())
  }, 6000)
}
export { clearNotifications }
