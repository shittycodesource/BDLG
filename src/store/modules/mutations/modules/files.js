export default {

    PUSH_FILES(state, data) {
        if (state.files.length && data.isNew == true) {
            state.isFileOverlayOpen = true;

            // state.files.forEach(item => {
                // item.isNew = false;
                // item.overlayBorder = false;
            // });
        }

        state.files.unshift(data);
    },

    CLEAR_FETCHED_FILES(state) {
        state.files = [];
    },

    INIT_FETCH(state) {
        state.isInitFetchDone = true;
    },

    OPEN_FILE_OVERLAY(state) {
        state.isFileOverlayOpen = true;
    },

    HIDE_FILE_OVERLAY(state) {
        state.isFileOverlayOpen = false;
    },

    SAVE_SUBSCRIPTION(state, sub) {
        state.sub = sub;
    },

    UNSUBCRIBE(state) {
        state.sub();
        state.sub = null;
    }

}