import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import { authService, objectService, userService } from '../../services'
import { checkPerimission } from '../middlewares'

export const store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [userService.reducerPath]: userService.reducer,
    [objectService.reducerPath]: objectService.reducer,
    authSlice
  },
  middleware: (defaultMiddleware) => defaultMiddleware()
    .concat(
      authService.middleware,
      userService.middleware,
      objectService.middleware,
      checkPerimission
    )
})

