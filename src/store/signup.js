import UserWrapper from '../api/userWrapper';
import client from '../api/client';

import {
    SET_TOKEN,
    SIGNUP_BEGIN,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
    SET_TOKEN2,
}
from './types'
import Cookies from 'js-cookie';
const ACCESS_TOKEN_STORAGE_KEY = 'ACCESS_TOKEN_STORAGE_KEY';
const REFRESH_TOKEN_STORAGE_KEY = 'REFRESH_STORAGE_KEY';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        hasError: false,
        token: null,
    },
    actions: {
        async createAccount({ commit }, { username, email, password }) {
            commit(SIGNUP_BEGIN);
            const userParams = {
                name: username,
                email: email,
                password: password,
            };
            try {
                const response = await new UserWrapper().create(userParams);
                commit(SET_TOKEN2, response.data);
                commit(SIGNUP_SUCCESS);
            } catch (error) {
                console.error(error);
                commit(SIGNUP_FAILURE);
            }
        },
    },
    mutations: {
        [SIGNUP_BEGIN](state) {
            state.isLoading = true;
        },
        [SIGNUP_SUCCESS](state) {
            state.isLoading = false;
            state.hasError = false;
        },
        [SIGNUP_FAILURE](state) {
            state.isLoading = false;
            state.hasError = true;
        },
        [SET_TOKEN](state, token) {
            Cookies.set(ACCESS_TOKEN_STORAGE_KEY, token.access);
            Cookies.set(REFRESH_TOKEN_STORAGE_KEY, token.refresh);
            client.defaults.headers.Authorization = `Bearer ${token.access}`;
            state.token = token;
        },
    },
};
