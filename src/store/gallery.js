import DrawingWrapper from '../api/drawingWrapper';
import Drawing from '../models/drawing';

import {
    SET_USER_GALLERY_BEGIN,
    SET_USER_GALLERY_SUCCESS,
    SET_USER_GALLERY_FAILURE,
    SET_PUBLIC_GALLERY_BEGIN,
    SET_PUBLIC_GALLERY_SUCCESS,
    SET_PUBLIC_GALLERY_FAILURE,
    SET_ALLDRAWINGS,
} from './types';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        hasError: false,
        drawings: [],
    },
    actions: {
        async setUserGallery({ commit }, currentUser) {
            try {
                commit(SET_USER_GALLERY_BEGIN);
                const response = await new DrawingWrapper().getBy('user', currentUser.id);
                if (response[0] instanceof Drawing) {
                    commit(SET_USER_GALLERY_SUCCESS);
                    commit(SET_ALLDRAWINGS, response);
                } else commit(SET_USER_GALLERY_FAILURE);
            } catch {
                commit(SET_USER_GALLERY_FAILURE);
            }
        },
        async setPublicGallery({ commit }) {
            try {
                commit(SET_PUBLIC_GALLERY_BEGIN);
                const response = await new DrawingWrapper().getBy('is_public', 'true');

                if (response[0] instanceof Drawing) {
                    commit(SET_PUBLIC_GALLERY_SUCCESS);
                    commit(SET_ALLDRAWINGS, response);
                } else commit(SET_PUBLIC_GALLERY_FAILURE);
            } catch {
                commit(SET_PUBLIC_GALLERY_FAILURE);
            }
        },
    },
    mutations: {
        [SET_USER_GALLERY_BEGIN](state) {
            state.isLoading = true;
        },
        [SET_USER_GALLERY_SUCCESS](state) {
            state.isLoading = false;
            state.hasError = false;
        },
        [SET_USER_GALLERY_FAILURE](state) {
            state.isLoading = false;
            state.hasError = true;
        },
        [SET_PUBLIC_GALLERY_BEGIN](state) {
            state.isLoading = true;
        },
        [SET_PUBLIC_GALLERY_SUCCESS](state) {
            state.isLoading = false;
            state.hasError = false;
        },
        [SET_PUBLIC_GALLERY_FAILURE](state) {
            state.isLoading = false;
            state.hasError = true;
        },
        [SET_ALLDRAWINGS](state, payload) {
            state.drawings = payload;
        },
    },
};
