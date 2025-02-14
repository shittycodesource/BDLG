import { db } from '../../../../firebase/index.js';
import { getDocs, query, collection, where, orderBy, limit } from 'firebase/firestore';

export default {

    async fetchFolder({getters}, { id, limitValue = 0, lastElement = 0 }) {
        const folder = getters.getFolder(+id);

        let q = query(collection(db, 'files'), where('folder', "==", +id), orderBy('createdAt', "desc"));
        // , limit(limitValue)
        const conditions = [];

        // if (lastElement) {
        //     conditions.push(startAfter(lastElement.date));
        // }

        q = query(q, ...conditions);

        const snapshots = await getDocs(q);
        const docs = [];

        snapshots.forEach(item => {
            if (item.exists()) {
                docs.push(item.data());
            }
        });

        const array = docs;

        // const array = await dispatch('addUserDataToArtworks', docs);
        return { folder, array };
    }


}