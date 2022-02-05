import UserWrapper from '../api/userWrapper';
import User from '../models/user';

import { SIGNUP_BEGIN, SIGNUP_FAILURE, SIGNUP_SUCCESS, SIGNUP_BAD_REQUEST } from './types';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        hasRespError: false,
        usernameError: [],
        emailError: [],
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
                console.log(response);

                if (response instanceof User) commit(SIGNUP_SUCCESS);
                else commit(SIGNUP_BAD_REQUEST, response.data);
            } catch (error) {
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
            state.hasRespError = false;
            state.usernameError = [];
            state.emailError = [];
        },
        [SIGNUP_FAILURE](state) {
            state.isLoading = false;
            state.hasRespError = true;
        },
        [SIGNUP_BAD_REQUEST](state, payload) {
            state.isLoading = false;
            state.hasRespError = true;
            let emailString = payload.email.toString();
            let usernameString = payload.username.toString();

            if (!state.usernameError.includes(usernameString)) {
                state.usernameError.push(usernameString);
            }
            if (!state.emailError.includes(emailString)) {
                state.emailError.push(emailString);
            }
        },
    },
};
