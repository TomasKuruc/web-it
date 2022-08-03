import { doc, deleteDoc } from "firebase/firestore";
import {db} from "index";


export const deleteFile = async (fileId: string | null) => {
    if (!fileId) {
        return;
    }

    const fileRef = doc(db, 'files', fileId);

    await deleteDoc(fileRef);
}