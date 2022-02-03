import UserWrapper from '../api/userWrapper';

import {
    SIGNUP_BEGIN,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
}
from './types'


export default {
    namespaced: true,
    state: {
        isLoading: false,
        hasError: false,
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
                await new UserWrapper().create(userParams);
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
    },
};
