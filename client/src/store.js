import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from './features/connectionSlice'

export default configureStore({
  reducer: {
    connection: connectionReducer
  },
})