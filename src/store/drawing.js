import Config from '../config';
import DrawingWapper from '../api/drawingWrapper';
import {
    CHNAGE_MODE,
    GET_ALLDRAWINGS,
    SET_DRAWINGID,
    SET_DRAWING,
    CHANGE_COLOR,
    CHANGE_WEIGHT,
    SET_UNDOTRIGGER,
    SET_REDOTRIGGER,
    SET_POINTERSPEED,
    SET_SAVETRIGGER,
    SET_LOADTRIGGER,
    SET_STOPPOINTERTRIGGER,
    TOGGLE_ISPUBLIC,

    SET_DRAWINGDATA,
    SET_DRAWINGIMGURL,
    SET_UPDATEDAT
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
            commit(GET_ALLDRAWINGS, all);
            console.log(state.allDrawings);
        },
        async redirectToDrawingPage({commit,state}, {id}){
            console.log("id="+state.currentDrawingID)
            await commit(SET_DRAWINGID,id);
            const curDrawing = state.allDrawings[state.currentDrawingID-1];
            await commit(SET_DRAWING,curDrawing);
            commit(SET_LOADTRIGGER);
        },
        saveDB({state,commit},{itemList,dataURL}){
            console.log(itemList);
            let data = JSON.stringify(itemList);
            console.log(data);
            console.log(state.allDrawings[state.currentDrawingID-1]);
            //databaseへ送出するように書替予定
                //dataを更新
                commit(SET_DRAWINGDATA, data);
                //imgを更新
                commit(SET_DRAWINGIMGURL, dataURL);
                //updatedAtを更新
                commit(SET_UPDATEDAT);

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
            commit(SET_UNDOTRIGGER);
        },
        redo({ commit }) {
            commit(SET_REDOTRIGGER);
        },
        setPointerSpeed({ commit }, { direction, value }) {
            commit(SET_POINTERSPEED, { direction: direction, value: value });
        },
        save({ commit }) {
            commit(SET_SAVETRIGGER);
        },
        stopPointer({ commit, state }) {
            commit(SET_STOPPOINTERTRIGGER);
            console.log(state.stopPointerTrigger);
        },
        toggleIsPublic({ commit }) {
            commit(TOGGLE_ISPUBLIC);
        },
        twitterShare() {
            console.log('gggg');
        },
    },
    mutations: {
        [GET_ALLDRAWINGS](state, all){
            state.allDrawings = all;
        },
        [SET_DRAWINGID](state, id){
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
        [SET_UNDOTRIGGER](state) {
            state.undoTrigger = !state.undoTrigger;
        },
        [SET_REDOTRIGGER](state) {
            state.redoTrigger = !state.redoTrigger;
        },
        [SET_POINTERSPEED](state, payload) {
            state.pointerSpeed[payload.direction].value = payload.value;
        },
        [SET_SAVETRIGGER](state) {
            state.saveTrigger = !state.saveTrigger;
        },
        [SET_LOADTRIGGER](state) {
            state.loadTrigger = !state.loadTrigger;
        },
        [SET_STOPPOINTERTRIGGER](state) {
            state.stopPointerTrigger = !state.stopPointerTrigger;
        },
        [TOGGLE_ISPUBLIC](state) {
            state.isPublic = !state.isPublic;
        },


        [SET_DRAWINGDATA](state,data){
            state.allDrawings[state.currentDrawingID-1].data=data;
        },
        [SET_DRAWINGIMGURL](state,dataURL){
            state.allDrawings[state.currentDrawingID-1].imgUrl=dataURL;
        },
        [SET_UPDATEDAT](state){
            state.allDrawings[state.currentDrawingID-1].updatedAt=new Date();
        }
    },
};
