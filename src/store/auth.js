import auth from '../api/auth';
import {
    LOGIN_BEGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    // LOGOUT,
    // REMOVE_TOKEN,
    SET_TOKEN,
} from './types';
import Cookies from 'js-cookie'

const TOKEN_STORAGE_KEY = 'TOKEN_STORAGE_KEY';
const isProduction = process.env.NODE_ENV === 'production';

export default {
    namespaced: true,
    state: {
        authenticating: false,
        error: false,
        token: null,
    },
    actions: {
        async login({ commit }, { username, password}) {
            commit(LOGIN_BEGIN);
            try {
              const response = await auth.login(username, password);
              console.log(response.data);
              commit(SET_TOKEN, response.data)
              commit(LOGIN_SUCCESS)
            } catch (error) {
              console.error(error);
              commit(LOGIN_FAILURE);
            }
        }
    },
    mutations: {
        [LOGIN_BEGIN](state) {
            state.authenticating = true;
            state.error = false;
          },
          [LOGIN_FAILURE](state) {
            state.authenticating = false;
            state.error = true;
          },
          [LOGIN_SUCCESS](state) {
            state.authenticating = false;
            state.error = false;
          },
          /* [LOGOUT](state) {
            state.authenticating = false;
            state.error = false;
          }, */
          [SET_TOKEN](state, token) {
            if (!isProduction) Cookies.set(TOKEN_STORAGE_KEY, token);
            Cookies.set(`TokenAccess ${token.access}`);
            Cookies.set(`TokenRefresh ${token.refresh}`);
            state.token = token;
          },
    },
};
