import { db, storage } from '@/firebase';
import { getDownloadURL, uploadBytes, ref as imageRef } from 'firebase/storage';
import { setDoc, updateDoc, doc as documentRef, getDoc, getDocs, collection, Timestamp, onSnapshot, limitToLast, deleteDoc, arrayUnion, increment, where, arrayRemove, query, orderBy, startAfter, limit, getCountFromServer, serverTimestamp } from 'firebase/firestore';

import uploadFiles from "@/utils/uploadFiles";
import generateRandomID from "@/utils/generateRandomID";


export default {

    /* 
        TODO:

            Fetch Files
            Send Files
            --------------
            Delete files (later)
    */

    /* 
        Fetch documents
        I think that's obvious
    */
    async fetchFiles({commit, getters}) {
        try {
            const unsub = onSnapshot(query(collection(db, 'files'), orderBy('createdAt', 'asc')), (snapshot) => {

                for (let i = 0; i <= snapshot.docChanges().length - 1; i++) {
                    const change = snapshot.docChanges()[i];
                    const doc = change.doc.data();

                    if (change.type === "added") {

                        if (doc.createdAt) {
                            if (getters.isInitDone) {
                                doc.isNew = true;
                            }

                            commit("PUSH_FILES", doc);
                        }
                    }
                }

                commit('INIT_FETCH');
            })
        } catch (error) {
            console.log('[fetchFiles() Error]');
            throw error;
        }
    },


    /* 
        Send Documents
    */
    async sendFiles({}, files) {
        try {
            const { urls, refs, sizes } = await uploadFiles(files);
            const result = [];

            for (let i = 0; i <= files.length - 1; i++) {
                result.push({ name: files[i].name, url: urls[i], ref: refs[i],  size: files[i].size });
            }

            const id = generateRandomID();

            const data = {
                userId: 0,
                isAnonymous: true,
                
                files: result,

                createdAt: serverTimestamp(),
                id
            };

            await setDoc(documentRef(db, 'files', id), data);
            await setDoc(documentRef(db, 'space', 'used'), { size: increment(sizes) }, { merge: true });
        } catch (error) {
            console.log('[sendFiles() Error]');
            throw error;
        }
    },

    openFileOverlay({commit}) {
        commit('OPEN_FILE_OVERLAY');
    },

    hideFileOverlay({commit}) {
        commit('HIDE_FILE_OVERLAY');
    }


}