import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "index";
import {doc, setDoc} from "firebase/firestore";

interface RegisterUserData {
    name: string,
    surename: string,
    email: string,
    password: string
}

export const registerUser = (data: RegisterUserData): void => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {

            const userRef = doc(db, 'users', res.user.uid);
            setDoc(userRef, {
                uid: res.user.uid,
                email: res.user.email,
                name: data.name,
                surename: data.surename,
            }, {merge: true});

        })
        .catch(err => console.log(err.message))
}
