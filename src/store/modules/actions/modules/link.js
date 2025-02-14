import { db, storage } from '@/firebase';
import { getDownloadURL, uploadBytes, ref as imageRef } from 'firebase/storage';
import { setDoc, updateDoc, doc as documentRef, getDoc, getDocs, collection, Timestamp, onSnapshot, limitToLast, deleteDoc, arrayUnion, increment, where, arrayRemove, query, orderBy, startAfter, limit, getCountFromServer, serverTimestamp } from 'firebase/firestore';

import uploadFiles from "@/utils/uploadFiles";
import generateRandomID from "@/utils/generateRandomID";


export default {

    async uploadLink({dispatch, commit, getters}, data) {
        try{

            const id = generateRandomID();

            const obj = {
                userId: 0,
                isAnonymous: true,
                
                url: data.url,
                name: data.name,

                isLink: true,

                files: [],

                createdAt: serverTimestamp(),
                id
            };

            await setDoc(documentRef(db, 'files', id), obj);
            await dispatch('clearFilesFromState');
            await dispatch('refetchFiles');

        } catch(error) {
            throw error;
        }
    }

}