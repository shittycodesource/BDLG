import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Filters ------------z----------------
import dateFilter from './filters/date.filter';
import localizeFilter from './filters/localize.filter.js';
import timeDifference from './filters/timeDifference.filter.js';

Vue.filter('date', dateFilter);
Vue.filter('localize', localizeFilter);
Vue.filter('difference', timeDifference);
// Filters ----------------------------


// Directives ----------------------------
import clickOutsideDirective from './directives/clickOutside.directive';

Vue.directive('click-outside', clickOutsideDirective);
// Directives ----------------------------




import { auth } from './firebase/index.js';
import { onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false

function createVueApp() {
    new Vue({
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
}

createVueApp();

// onAuthStateChanged(auth, async (user) => {
//     try {
//         if (user) {
//             createVueApp();
//         } else {
//             createVueApp();
//         }
//     } catch (error) {
//         throw error;
//     }
// });