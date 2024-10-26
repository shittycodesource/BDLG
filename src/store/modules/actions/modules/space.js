import { db } from "@/firebase";
import { getDoc, doc as documentRef, onSnapshot } from "firebase/firestore";

export default {

    /* Fetch value of how much memory is used in storage */
    async fetchStorageSize({commit}) {
        try {
            // const snapshot = await getDoc(documentRef(db, 'space', 'used'));

            // if (snapshot.exists()) {
            //     const data = snapshot.data();

            //     commit('SET_STORAGE_SIZE', data.size);
            // } else {
            //     return 0;
            // }

            const unsub = onSnapshot(documentRef(db, 'space', 'used'), (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();

                    commit('SET_STORAGE_SIZE', data.size);
                } else {
                    return 0;
                }
            })
        } catch(error) {
            console.log('[getSize() Error]')
            throw error;
        }
    }

}