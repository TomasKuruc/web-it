import { signOut } from "firebase/auth";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";
import {setUser} from "store/user/user";
import {auth} from "index";

export const logout = (dispatch:  Dispatch<AnyAction>): void => {
    signOut(auth).then(r => {
        dispatch(setUser(null));
    }).catch(err => {
        console.log('error');
    })
}