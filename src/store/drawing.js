import DrawingWrapper from '../api/drawingWrapper';
import Drawing from '../models/drawing';
import drawingEditter from './drawingEditter';
import {
    SET_DRAWING,
    DRAWING_REQUEST_BEGIN,
    DRAWING_REQUEST_SUCCESS,
    DRAWING_REQUEST_FAILURE,
    TOGGLE_IS_PUBLIC,
    CREATE_BEGIN,
    CREATE_SUCCESS,
    CREATE_FAILURE,
} from './types';

export default {
    namespaced: true,
    modules: {
        drawingEditter,
    },
    state: {
        drawing: {},
        hasError: false,
        isLoading: false,
        createLoading: false,
        createError: false,
    },
    actions: {
        //async getAllDrawings(/* { commit, state } */) {
        //デバッグのため更新をあえて防止している。撤去予定
        // if (state.allDrawings.length != 0) return;
        // const all = await drawingWrapper.getAll();
        // commit(GET_ALL_DRAWINGS, all);
        // console.log(state.allDrawings);
        //},
        // async setDrawingByUserId({ commit }) {
        //     try {
        //         const current_user = await new UserWrapper().getCurrent();
        //         const response = await new DrawingWapper().getBy('user', current_user.id);
        //         console.log(response);
        //         if (response instanceof Drawing) {
        //             commit(USER_DRAWING_RE)
        //         }
        //     } catch {

        //     }
        // },
        async createDrawing({ commit }, payload) {
            try {
                commit(CREATE_BEGIN);
                const response = await new DrawingWrapper().create(payload);
                console.log(response);
                if (response instanceof Drawing) commit(CREATE_SUCCESS);
                else commit(CREATE_FAILURE);
            } catch {
                commit(CREATE_FAILURE);
            }
        },
        async setDrawingById({ commit }, id) {
            try {
                const response = await new DrawingWrapper().getById(id);
                console.log(response);
                if (response instanceof Drawing) {
                    commit(DRAWING_REQUEST_SUCCESS);
                    commit(SET_DRAWING, response);
                } else commit(DRAWING_REQUEST_FAILURE, response.data);
            } catch {
                commit(DRAWING_REQUEST_FAILURE);
            }
        },
        async saveDB({ state, commit }, { itemList, dataURL }) {
            const data = JSON.stringify(itemList);
            const updateProps = {
                data: data,
                image: dataURL,
            };
            console.log(state.drawing);
            commit(DRAWING_REQUEST_BEGIN);
            try {
                const response = await new DrawingWrapper().update(state.drawing.id, updateProps);
                console.log(response);
                if (response instanceof Drawing) commit(DRAWING_REQUEST_SUCCESS);
                else commit(DRAWING_REQUEST_FAILURE, response.data);
            } catch (error) {
                console.log(error.response);
                commit(DRAWING_REQUEST_FAILURE);
            }
        },
        twitterShare() {
            console.log('gggg');
        },
        toggleIsPublic() {},
    },
    mutations: {
        [CREATE_BEGIN](state) {
            state.createLoading = true;
        },
        [CREATE_SUCCESS](state) {
            state.createLoading = false;
            state.createError = false;
        },
        [CREATE_FAILURE](state) {
            state.createLoading = false;
            state.createError = true;
        },
        [DRAWING_REQUEST_BEGIN](state) {
            state.isLoading = true;
        },
        [DRAWING_REQUEST_SUCCESS](state) {
            state.isLoading = false;
            state.hasError = false;
        },
        [DRAWING_REQUEST_FAILURE](state) {
            state.isLoading = false;
            state.hasError = true;
        },
        [SET_DRAWING](state, newDrawing) {
            state.drawing = newDrawing;
        },
        [TOGGLE_IS_PUBLIC](state) {
            state.drawing.isPublic = !state.drawing.isPublic;
        },
    },
};
