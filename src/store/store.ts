import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {fileSlice} from "store/files/file";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import {filesSlice} from "store/files/files";
import {userSlice} from "store/user/user";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    fileDetail: fileSlice.reducer,
    files: filesSlice.reducer,
    session: userSlice.reducer
}));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

