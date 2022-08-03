import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "store/store";

export interface User {
    uid: string,
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    providerData: ProviderData[]
    stsTokenManager: StsTokenManager
    createdAt: string
    lastLoginAt: string
    apiKey: string
    appName: string
}

export interface ProviderData {
    providerId: string
    uid: string
    displayName: string | null
    email: string
    phoneNumber: string | null
    photoURL: string | null
}

export interface StsTokenManager {
    refreshToken: string
    accessToken: string
    expirationTime: number
}

export interface UserState {
    user: User | null
}


const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

           state.user = action.payload
        },

        clearUser: (state) => {
            Object.assign(state, initialState)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.session;

export default userSlice.reducer