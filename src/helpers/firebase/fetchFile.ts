import { doc, getDoc } from "firebase/firestore";
import {db} from "index";

export const fetchFile = async (fileId: string) => {
    const docRef = doc(db, "users", fileId);
    getDoc(docRef).then(r => {
        return r.data();
    });
}