import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import drawing from './drawing';
import auth from './auth';
import signup from './signup';
import gallery from './gallery';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        drawing,
        signup,
        gallery,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
});
