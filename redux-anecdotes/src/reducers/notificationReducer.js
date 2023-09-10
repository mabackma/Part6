import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    }
  }
})

// Returns a dispatch
export const displayNotification = (message) => {
  return (dispatch) => {
    dispatch(notificationChange(message))

    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }
}

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer