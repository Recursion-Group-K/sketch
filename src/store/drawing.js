import drawingEditter from './drawingEditter';
import {
    SET_DRAWING,
    SET_DRAWING_DATA,
    SET_DRAWINGIMG_URL,
    SET_UPDATE_DATA,
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
        async getAllDrawings(/* { commit, state } */) {
            //デバッグのため更新をあえて防止している。撤去予定
            // if (state.allDrawings.length != 0) return;
            // const all = await drawingWrapper.getAll();
            // commit(GET_ALL_DRAWINGS, all);
            // console.log(state.allDrawings);
        },
        async redirectToDrawingPage(/* { commit, state }, { id } */) {
            // console.log("id="+state.currentDrawingID)
            // await commit(SET_DRAWING_ID,id);
            // const curDrawing = state.allDrawings[state.currentDrawingID-1];
            // await commit(SET_DRAWING,curDrawing);
            // commit(SET_LOAD_TRIGGER);
        },
        saveDB(/* { state, commit }, { itemList, dataURL } */) {
            // console.log(itemList);
            // let data = JSON.stringify(itemList);
            // console.log(data);
            // console.log(state.allDrawings[state.currentDrawingID-1]);
            // //databaseへ送出するように書替予定
            //     //dataを更新
            //     commit(SET_DRAWING_DATA, data);
            //     //imgを更新
            //     commit(SET_DRAWINGIMG_URL, dataURL);
            //     //updatedAtを更新
            //     commit(SET_UPDATE_DATA);
            // console.log(state.allDrawings[state.currentDrawingID-1]);
        },

        save({ commit }) {
            commit(DRAWING_SAVE_BEGIN);

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
        toggleIsPublic () {
            
        }
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
        [SET_DRAWING](state, drawing) {
            state.currentDrawing = drawing;
        },
        [SET_DRAWING_DATA](state, data) {
            state.allDrawings.data = data;
        },
        [SET_DRAWINGIMG_URL](state, dataURL) {
            state.allDrawings.imgUrl = dataURL;
        },
        [SET_UPDATE_DATA](state) {
            state.drawing.updatedAt = new Date();
        },
        [TOGGLE_IS_PUBLIC](state) {
            state.drawing.isPublic = !state.drawing.isPublic;
        },
    },
};
