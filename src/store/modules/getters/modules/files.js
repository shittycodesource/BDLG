export default {

    getFiles: (state) => state.files,

    isInitDone: (state) => state.isInitFetchDone,

    getFileOverlayState: (state) => state.isFileOverlayOpen,

}