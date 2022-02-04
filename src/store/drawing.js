import DrawingWapper from '../api/drawingWrapper';
import drawingEditter from './drawingEditter';
import {
    SET_DRAWING,
    DRAWING_SAVE_BEGIN,
    DRAWING_SAVE_SUCCESS,
    DRAWING_SAVE_FAILURE,
    TOGGLE_IS_PUBLIC,
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
    },
    actions: {
        //async getAllDrawings(/* { commit, state } */) {
        //デバッグのため更新をあえて防止している。撤去予定
        // if (state.allDrawings.length != 0) return;
        // const all = await drawingWrapper.getAll();
        // commit(GET_ALL_DRAWINGS, all);
        // console.log(state.allDrawings);
        //},
        async redirectToDrawingPage({ commit, state, dispatch }, { id }) {
            console.log('id=' + id);
            const newDrawing = await new DrawingWapper().getById(id);
            await commit(SET_DRAWING, newDrawing);
            console.log(state.drawing);
            dispatch('drawingEditter/load');
        },
        saveDB({ state, commit }, { itemList, dataURL }) {
            console.log(itemList);
            const data = JSON.stringify(itemList);
            console.log(data);
            const updateProps = {
                data: data,
                img: dataURL,
                updatedAt: new Date(),
            };
            console.log(state.drawing);
            const updateDrawing = new DrawingWapper().update(state.drawing.id, updateProps);
            console.log(updateDrawing);
            commit(SET_DRAWING, updateDrawing);
        },
        save({ commit, dispatch }) {
            commit(DRAWING_SAVE_BEGIN);
            dispatch('drawingEditter/save');
            // axios の代わり
            // 成功した時
            setTimeout(() => {
                commit(DRAWING_SAVE_SUCCESS);
            }, 3000);
            // 失敗した時
            // setTimeout(() => {
            //     commit(DRAWING_SAVE_FAILURE)
            // },3000)
        },
        twitterShare() {
            console.log('gggg');
        },
        toggleIsPublic() {},
    },
    mutations: {
        [DRAWING_SAVE_BEGIN](state) {
            state.isLoading = true;
        },
        [DRAWING_SAVE_SUCCESS](state) {
            state.isLoading = false;
            state.hasError = false;
        },
        [DRAWING_SAVE_FAILURE](state) {
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
