export default {
    getFolders: (state) => state.folders,
    getFolder: (state) => (id) => state.folders.find(item => item.id == id)
}