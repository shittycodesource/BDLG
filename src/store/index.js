import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './modules/state/index.js';
import actions from './modules/actions/index.js';
import mutations from './modules/mutations/index.js';
import getters from './modules/getters/index.js';

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
