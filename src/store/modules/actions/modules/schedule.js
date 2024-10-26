import { db } from '@/firebase';
import generateRandomID from '@/utils/generateRandomID';
import { doc as documentRef, getDoc, setDoc, arrayUnion, updateDoc, Timestamp } from 'firebase/firestore';


export default {

    async fetchSchedule({}) {
        try {
            const doc = await getDoc(documentRef(db, 'schedule', 'tomorrow'));

            if (doc.exists()) {
                const data = doc.data();
                
                return data.list;
            } else {
                return 'idk';
            }
        } catch(error) {
            console.log('fetchSchedule() Error:', error);
            throw error;
        }
    },


    async addToSchedule({}, data) {
        try {
            const id = generateRandomID();

            await setDoc(documentRef(db, 'schedule', 'tomorrow'), { list: arrayUnion({
                name: data.subject,
                teacher: data.teacher,
                startTime: Timestamp.fromDate(data.start),
                endTime: Timestamp.fromDate(data.end),
                isMarkedAsBreak: data.isABreak,
                id: id
            }) }, { merge: true });

        } catch(error) {
            throw error;
        }
    }

}