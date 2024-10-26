import { storage } from '../firebase/index.js';
import { getDownloadURL, uploadBytes, ref as fileRef } from 'firebase/storage';
/**
 * Takes an array (can be with 1 file), uploads to firestore and returns array of URLs, Refs and sum of sizes   
 * @param {Array} files - the array
 * @param {String} folder - where will files be stored  
*/
export default async function uploadFiles(files, folder = '') {
    try {
        if (files.length <= 0) {
            return { urls: [], refs: [], sizes: 0 };
        }

        const toUpload = []; // promises for "uploadBytes" method
        const toDownload = []; // promises for "getDownloadURL" method

        const refs = [];

        let sizes = 0;

            for (let i = 0; i <= files.length - 1; i++) 
            {
                const path = `${folder}/${files[i].name}`;
               
                refs.push(path);
                toUpload.push(uploadBytes(fileRef(storage, path), files[i]));

                sizes += files[i].size; // add size to update value in firestore
            }

            const uploads = await Promise.all(toUpload);

            for (let i = 0; i <= uploads.length - 1; i++) 
            { 
                toDownload.push(getDownloadURL(fileRef(storage, refs[i]))); 
            };

            const urls = await Promise.all(toDownload);

            return { urls, refs, sizes };
    } catch(error) {
        console.log('[uploadFiles() Error]');
        throw error;
    }
}