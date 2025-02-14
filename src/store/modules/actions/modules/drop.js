export default {
    dropFilesToState({commit}, files) {
        commit("DROP_FILES_TO_STATE", files);
    },

    removeFileFromState({commit, getters}, file) {
        // console.log(getters.getDroppedFiles)
        // console.log(getters.getDroppedFiles.indexOf(file))

        // getters.getDroppedFiles.forEach((item, key) => {
        //     if (item == file) {
        //         console.log('KEEY', key)
        //     }
        // })

        const index = getters.getDroppedFiles.indexOf(file);

        // console.log('index', index);

        commit("REMOVE_FILE_FROM_STATE", index)
    },

    clearFilesFromState({commit}) {
        commit("CLEAR_FILES_FROM_STATE");
    }
}