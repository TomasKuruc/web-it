import { signOut } from "firebase/auth";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";
import {clearUser} from "store/user/user";
import {auth} from "index";
import {clearFileDetail} from "store/files/file";
import {clearFiles} from "store/files/files";

export const logout = (dispatch:  Dispatch<AnyAction>): void => {
    signOut(auth).then(r => {
        dispatch(clearUser());
        dispatch(clearFileDetail());
        dispatch(clearFiles());
    }).catch(err => {
        console.log('error');
    })
}