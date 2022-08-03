import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "store/store";

export interface FileData {
    id: number,
    item: any
}

export interface File {
    id: string | null,
    uid: string | null,
    name?: string | null,
    created_at?: string | null,
    pattern: string,
    data: FileData[],
    price: number,
    total_hours: number,
    total_price: number
}


export interface FilesState {
    unsaved: File[],
    saved: File[]
}

const initialState: FilesState = {
    unsaved: [],
    saved: []
}

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        saveFile: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            if (state.saved.find(file => file.id === action.payload.id)) {
                return;
            }

            state.saved.push(action.payload);
        },

        setSavedFiles: (state, action) => {
            state.saved = action.payload
        },

        addFileToUnsaved: (state, action) => {
            if (state.saved.find(file => file.id === action.payload.id)) {
                return;
            }

            state.unsaved.push(action.payload);
        },

        removeFileFromUnsaved: (state, action) => {
            state.unsaved = state.unsaved.filter(file => file.id !== action.payload);
        },

        clearFiles: (state) => {
            Object.assign(state, initialState)
        }
    },
})

// Action creators are generated for each case reducer function
export const { saveFile, setSavedFiles, addFileToUnsaved, removeFileFromUnsaved, clearFiles } = filesSlice.actions;
export const selectFiles = (state: RootState) => state.files;

export default filesSlice.reducer