import DrawingWapper from '../api/drawingWrapper';
import UserWrapper from '../api/userWrapper';
import Drawing from '../models/drawing';
import drawingEditter from './drawingEditter';
import {
    SET_DRAWING,
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
        //async getAllDrawings(/* { commit, state } */) {
        //デバッグのため更新をあえて防止している。撤去予定
        // if (state.allDrawings.length != 0) return;
        // const all = await drawingWrapper.getAll();
        // commit(GET_ALL_DRAWINGS, all);
        // console.log(state.allDrawings);
        //},
        async setDrawingById({ commit }, id) {
            console.log(id);
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
                data: data,
                image: dataURL,
            };
            console.log(state.drawing);
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
        async twitterShare(_,{id}) {
            console.log("DrawingID:"+id);
            const shareDrawing = await new DrawingWapper().getById(id);
            
            //publicでないなら何もしない
            if(!shareDrawing.isPublic) return;

            //閲覧しているユーザーと作品の作者が一緒かどうかで文章を変える
            const currentUser = await new UserWrapper().getCurrent();
            console.log("auther:"+ shareDrawing.userId);
            console.log("current:"+ currentUser.id);
            const isAuther = currentUser.id==shareDrawing.userId;
            let text = "";
            if(isAuther) text = "を描きました!"
            else text = "を閲覧しました!"

            //aタグを作成してクリック
            const drawingUrl = process.env.VUE_APP_SERVER_URL+"/Drawing/"+id;
            const href = `http://twitter.com/share?text=「${shareDrawing.title}」${text}&url=${drawingUrl}`
            const link = document.createElement('a');
            link.addEventListener("click",function(){
                window.open(encodeURI(decodeURI(href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); 
                return false;
            });
            link.rel="nofollow";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        toggleIsPublic() {},
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
        [TOGGLE_IS_PUBLIC](state) {
            state.drawing.isPublic = !state.drawing.isPublic;
        },
    },
};
