import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "store/store";
import {File} from "./files";


const initialState: File = {
    uid: null,
    id: null,
    name: null,
    created_at: null,
    data: []
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileDetail: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

             state.id = action.payload.id;
             state.name = action.payload.name;
             state.created_at = action.payload.created_at;
             state.data = action.payload.data;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setFileDetail } = fileSlice.actions;
export const selectFileDetail = (state: RootState) => state.fileDetail;

export default fileSlice.reducer