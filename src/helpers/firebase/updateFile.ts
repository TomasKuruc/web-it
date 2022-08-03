import {db} from "index";
import {doc, updateDoc } from "firebase/firestore";
import {File} from "store/files/files";

export const updateFile = async (file: File) => {
    if (!file.id) {
        return
    }

    const fileRef = doc(db, "files", file.id);

    return await updateDoc(fileRef, {...file});
}