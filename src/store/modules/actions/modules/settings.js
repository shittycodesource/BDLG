export default {
    
    updateSettings({commit}, options) {
        localStorage.setItem('files_options', JSON.stringify(options));
        
        commit('UPDATE_SETTINGS', options);
    },

    loadSettings({commit}) {
        const options = JSON.parse(localStorage.getItem('files_options'));
        
        console.log('setSettings', options);
        
        if (options) {
            commit('UPDATE_SETTINGS', options);
        }
    }

}