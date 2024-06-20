import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IState {
  email?: string
  accessToken?: string
}

const initialState: IState | undefined = {
    accessToken: "test"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthDetail: (state, action: PayloadAction<IState>) => {
        return {
        ...state,
        ...action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateAuthDetail } = authSlice.actions;

export default authSlice.reducer;