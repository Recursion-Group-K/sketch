import DrawingWapper from '../api/drawingWrapper';
import UserWrapper from '../api/userWrapper';
import Drawing from '../models/drawing';
import drawingEditter from './drawingEditter';
import {
    SET_DRAWING,
    SET_DRAWING_TITLE,
    DRAWING_REQUEST_BEGIN,
    DRAWING_REQUEST_SUCCESS,
    DRAWING_REQUEST_FAILURE,
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
        async toggleIsPublic({ commit }, drawing) {
            const updateProps = {
                isPublic: !drawing.isPublic,
            };
            commit(DRAWING_REQUEST_BEGIN);
            try {
                const response = await new DrawingWapper().update(drawing.id, updateProps);
                console.log(response);
                if (response instanceof Drawing) commit(DRAWING_REQUEST_SUCCESS);
                else commit(DRAWING_REQUEST_FAILURE, response.data);
            } catch (error) {
                console.log(error.response);
                commit(DRAWING_REQUEST_FAILURE);
            }
        },
        async setDrawingById({ commit }, id) {
            try {
                const response = await new DrawingWapper().getById(id);
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
                title: state.drawing.title,
                data: data,
                image: dataURL,
            };
            commit(DRAWING_REQUEST_BEGIN);
            try {
                const response = await new DrawingWapper().update(state.drawing.id, updateProps);
                console.log(response);
                if (response instanceof Drawing) commit(DRAWING_REQUEST_SUCCESS);
                else commit(DRAWING_REQUEST_FAILURE, response.data);
            } catch (error) {
                console.log(error.response);
                commit(DRAWING_REQUEST_FAILURE);
            }
        },
        async twitterShare(_, { id }) {
            console.log('DrawingID:' + id);
            const shareDrawing = await new DrawingWapper().getById(id);

            //publicでないなら何もしない
            if (!shareDrawing.isPublic) return;

            //閲覧しているユーザーと作品の作者が一緒かどうかで文章を変える
            const currentUser = await new UserWrapper().getCurrent();
            console.log('auther:' + shareDrawing.userId);
            console.log('current:' + currentUser.id);
            const isAuther = currentUser.id == shareDrawing.userId;
            const text = isAuther ? 'を描きました!' : 'を閲覧しました!';

            //aタグを作成してクリック
            const drawingUrl = `${process.env.VUE_APP_CLIENT_URL}/drawing/${id}`;
            const href = `http://twitter.com/share?text=「${shareDrawing.title}」${text}&url=${drawingUrl}`;
            const link = document.createElement('a');
            link.addEventListener('click', function () {
                window.open(
                    encodeURI(decodeURI(href)),
                    'tweetwindow',
                    'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
                );
                return false;
            });
            link.rel = 'nofollow';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        setDrawingTitle({ commit }, { newTitle }) {
            commit(SET_DRAWING_TITLE, newTitle);
        },
    },
    mutations: {
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
        [SET_DRAWING_TITLE](state, newTitle) {
            state.drawing.title = newTitle;
        },
        [TOGGLE_IS_PUBLIC](state) {
            state.drawing.isPublic = !state.drawing.isPublic;
        },
    },
};
