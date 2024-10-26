import { db, storage } from '@/firebase';
import { getDownloadURL, uploadBytes, ref as imageRef } from 'firebase/storage';
import { setDoc, updateDoc, doc as documentRef, getDoc, getDocs, collection, Timestamp, onSnapshot, limitToLast, deleteDoc, arrayUnion, increment, where, arrayRemove, query, orderBy, startAfter, limit, getCountFromServer, serverTimestamp } from 'firebase/firestore';

export default {

    async fetchServerTime({commit}) {
        try {
            // you can use setInterval to count time that was spent on getting timestamp from server
            // and add this time to the timestamp to remove time gap 

            console.log('fetching time from server');

            // Update server time before getting it
            await setDoc(documentRef(db, 'time', 'doc'), { time: serverTimestamp() }, { merge: true });

            // Get the time
            const doc = await getDoc(documentRef(db, 'time', 'doc'));

            if (doc.exists()) {
                const data = doc.data();
                
                console.log('done, set time to vuex...');
                commit('SET_TIME_TO_STATE', data.time);
            } else {
                return 'idk';
            }
        } catch(error) {
            console.log('fetchServerTime() Error:', error)
            throw error;
        }
    }

}