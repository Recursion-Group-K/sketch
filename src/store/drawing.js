import Config from '../config';
import DrawingWapper from '../api/drawingWrapper';
import {
    CHNAGE_MODE,
    GET_ALL_DRAWINGS,
    SET_DRAWING_ID,
    SET_DRAWING,
    CHANGE_COLOR,
    CHANGE_WEIGHT,
    SET_UNDO_TRIGGER,
    SET_REDO_TRIGGER,
    SET_POINTER_SPEED,
    SET_SAVE_TRIGGER,
    SET_LOAD_TRIGGER,
    SET_STOP_POINTER_TRIGGER,
    TOGGLE_IS_PUBLIC,
    SET_DRAWING_DATA,
    SET_DRAWINGIMG_URL,
    SET_UPDATE_DATA,
    DRAWING_SAVE_BEGIN,
    DRAWING_SAVE_SUCCESS,
    DRAWING_SAVE_FAILURE,
} from './types';

const drawingWrapper = new DrawingWapper();
export default {
    namespaced: true,
    state: {
        mode: Config.mode.EtchASketch,
        allDrawings: [],
        currentDrawingID: 0,
        currentDrawing: {},
        color: '#000000',
        weight: 3,
        pointerSpeed: {
            up: { keys: ['d'], value: false },
            down: { keys: ['f'], value: false },
            right: { keys: ['k'], value: false },
            left: { keys: ['j'], value: false },
        },

        hasError: false,
        isLoading: false,
        isPublic: false,
        undoTrigger: false,
        redoTrigger: false,
        saveTrigger: false,
        loadTrigger: false,
        stopPointerTrigger: false,
    },
    getters: {
        isEtchASketchMode: (state) => state.mode == Config.mode.EtchASketch,
    },
    actions: {
        async getAllDrawings({commit, state}){
            //デバッグのため更新をあえて防止している。撤去予定
            if(state.allDrawings.length!=0)return;

            const all = await drawingWrapper.getAll();
            commit(GET_ALL_DRAWINGS, all);
            console.log(state.allDrawings);
        },
        async redirectToDrawingPage({commit,state}, {id}){
            console.log("id="+state.currentDrawingID)
            await commit(SET_DRAWING_ID,id);
            const curDrawing = state.allDrawings[state.currentDrawingID-1];
            await commit(SET_DRAWING,curDrawing);
            commit(SET_LOAD_TRIGGER);
        },
        saveDB({state,commit},{itemList,dataURL}){
            console.log(itemList);
            let data = JSON.stringify(itemList);
            console.log(data);
            console.log(state.allDrawings[state.currentDrawingID-1]);
            //databaseへ送出するように書替予定
                //dataを更新
                commit(SET_DRAWING_DATA, data);
                //imgを更新
                commit(SET_DRAWINGIMG_URL, dataURL);
                //updatedAtを更新
                commit(SET_UPDATE_DATA);

            console.log(state.allDrawings[state.currentDrawingID-1]);
        },
        changeMode({ commit }, { mode }) {
            if (!Config.mode[mode]) return false;
            commit(CHNAGE_MODE, mode);
            return true;
        },
        changeColor({ commit }, { newColor }) {
            commit(CHANGE_COLOR, newColor);
        },
        changeWeight({ commit }, { newWeight }) {
            commit(CHANGE_WEIGHT, newWeight);
        },
        undo({ commit }) {
            commit(SET_UNDO_TRIGGER);
        },
        redo({ commit }) {
            commit(SET_REDO_TRIGGER);
        },
        setPointerSpeed({ commit }, { direction, value }) {
            commit(SET_POINTER_SPEED, { direction: direction, value: value });
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
        stopPointer({ commit, state }) {
            commit(SET_STOP_POINTER_TRIGGER);
            console.log(state.stopPointerTrigger);
        },
        toggleIsPublic({ commit }) {
            commit(TOGGLE_IS_PUBLIC);
        },
        twitterShare() {
            console.log('gggg');
        },
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
        [GET_ALL_DRAWINGS](state, all){
            state.allDrawings = all;
        },
        [SET_DRAWING_ID](state, id){
            state.currentDrawingID = id;
        },
        [SET_DRAWING](state, curDrawing){
            state.currentDrawing = curDrawing
        },
        [CHNAGE_MODE](state, mode) {
            state.mode = mode;
        },
        [CHANGE_COLOR](state, color) {
            state.color = color;
        },
        [CHANGE_WEIGHT](state, weight) {
            state.weight = Number(weight);
        },
        [SET_UNDO_TRIGGER](state) {
            state.undoTrigger = !state.undoTrigger;
        },
        [SET_REDO_TRIGGER](state) {
            state.redoTrigger = !state.redoTrigger;
        },
        [SET_POINTER_SPEED](state, payload) {
            state.pointerSpeed[payload.direction].value = payload.value;
        },
        [SET_SAVE_TRIGGER](state) {
            state.saveTrigger = !state.saveTrigger;
        },
        [SET_LOAD_TRIGGER](state) {
            state.loadTrigger = !state.loadTrigger;
        },
        [SET_STOP_POINTER_TRIGGER](state) {
            state.stopPointerTrigger = !state.stopPointerTrigger;
        },
        [TOGGLE_IS_PUBLIC](state) {
            state.isPublic = !state.isPublic;
        },


        [SET_DRAWING_DATA](state,data){
            state.allDrawings[state.currentDrawingID-1].data=data;
        },
        [SET_DRAWINGIMG_URL](state,dataURL){
            state.allDrawings[state.currentDrawingID-1].imgUrl=dataURL;
        },
        [SET_UPDATE_DATA](state){
            state.allDrawings[state.currentDrawingID-1].updatedAt=new Date();
        }
    },
};
