import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "index";
import {setUser} from "store/user/user";
import {AnyAction, Dispatch} from "@reduxjs/toolkit";

interface LoginData {
    email: string,
    password: string
}

export const login = (data: LoginData, dispatch:  Dispatch<AnyAction>): void => {
    signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatch(setUser(userCredential.user));
            console.log(user)

            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}