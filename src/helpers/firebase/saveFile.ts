import {doc, setDoc} from "firebase/firestore";
import {db} from "index";
import {File} from "store/files/files";

export const saveFile = (file: File): void => {
    if (!file.id) {
        return
    }
    const fileRef = doc(db, 'files', file.id);
    setDoc(fileRef, file, {merge: true});
}