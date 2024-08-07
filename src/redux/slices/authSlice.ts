import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces'

const initialState: { data: null | IUser } = { data: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<IUser | null>) => {
      return { ...state, data: action.payload }
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateAuth } = authSlice.actions;

export default authSlice.reducer;