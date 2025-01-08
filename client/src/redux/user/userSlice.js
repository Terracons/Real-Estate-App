import { createSlice } from '@reduxjs/toolkit'
import { useReducer } from 'react'

const initialState = {
  currentUser:null,
  error:null,
  loading:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SignInStart: (state) => {
        state.loading=true
     
    },
    SignInSuccess: (state, action) => {
      state.currentUser = action.payload,
      state.loading = false,
      state.error=null
    },
    SignInFailure: (state, action) => {
        state.error= action.payload,
        state.loading = false
      },
    updateStart: (state) => {
        state.loading=true
     
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload,
      state.loading = false,
      state.error=null
    },
    updateFailure: (state, action) => {
        state.error= action.payload,
        state.loading = false
      }
  },
})

// Action creators are generated for each case reducer function
export const { SignInStart, SignInSuccess, SignInFailure, updateStart,updateSuccess,updateFailure } = userSlice.actions

export default userSlice.reducer