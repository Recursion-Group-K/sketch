import client from '../api/client';
import Auth from '../api/auth';
import {
    LOGIN_BEGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REMOVE_TOKEN,
    SET_TOKEN,
} from './types';
import Cookies from 'js-cookie';

const ACCESS_TOKEN_STORAGE_KEY = 'ACCESS_TOKEN_STORAGE_KEY';
const REFRESH_TOKEN_STORAGE_KEY = 'REFRESH_STORAGE_KEY';
// const isProduction = process.env.NODE_ENV === 'production';

export default {
    namespaced: true,
    state: {
        authenticating: false,
        error: false,
        token: null,
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        initSession({ dispatch }) {
            if (Cookies.get(ACCESS_TOKEN_STORAGE_KEY) && Cookies.get(REFRESH_TOKEN_STORAGE_KEY)) {
                const refresh = Cookies.get(REFRESH_TOKEN_STORAGE_KEY);
                dispatch('refreshToken', refresh);
            }
        },
        async refreshToken({ commit }, refreshToken) {
            commit(LOGIN_BEGIN);
            try {
                const response = await new Auth().refreshToken(refreshToken);

                commit(SET_TOKEN, { access: response.data.access, refresh: refreshToken });
                commit(LOGIN_SUCCESS);
            } catch (error) {
                console.error(error);
                commit(LOGIN_FAILURE);
            }
        },
        async login({ commit }, { username, password }) {
            commit(LOGIN_BEGIN);
            try {
                const response = await new Auth().login(username, password);
                commit(SET_TOKEN, response.data);
                commit(LOGIN_SUCCESS);
            } catch (error) {
                console.error(error);
                commit(LOGIN_FAILURE);
            }
        },
        logout({ commit }) {
            commit(LOGOUT);
            commit(REMOVE_TOKEN);
        },
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
        [LOGOUT](state) {
            state.authenticating = false;
            state.error = false;
        },
        [SET_TOKEN](state, token) {
            Cookies.set(ACCESS_TOKEN_STORAGE_KEY, token.access);
            Cookies.set(REFRESH_TOKEN_STORAGE_KEY, token.refresh);
            client.defaults.headers.Authorization = `Bearer ${token.access}`;
            state.token = token;
        },
        [REMOVE_TOKEN](state) {
            Cookies.remove(ACCESS_TOKEN_STORAGE_KEY);
            Cookies.remove(REFRESH_TOKEN_STORAGE_KEY);
            delete client.defaults.headers.Authorization;
            state.token = null;
        },
    },
};
