import {doc, getDocs, query, where, collection } from "firebase/firestore";
import {db} from "index";

export const fetchUserFiles = async (uid: string) => {
    const q = query(collection(db, "files"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    const data: any = [];
    querySnapshot.forEach(doc => {
        data.push(doc.data());
    });

    return data;
}