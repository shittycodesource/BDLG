export default {

    DROP_FILES_TO_STATE(state, files) {
        state.droppedFiles = files;
    },

    REMOVE_FILE_FROM_STATE(state, index) {
        console.log('removeeeeee', index)

        console.log(state.droppedFiles);

        state.droppedFiles.splice(index, 1);
        console.log(state.droppedFiles);
        // state.droppedFiles = state.droppedFiles.filter(function(item) {
        //     return item != file
        // })
    },

    CLEAR_FILES_FROM_STATE(state) {
        state.droppedFiles = [];
    }

}