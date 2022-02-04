import Config from '../config';
import {
    SET_MODE,
    SET_COLOR,
    SET_WEIGHT,
    SET_UNDO_TRIGGER,
    SET_REDO_TRIGGER,
    SET_POINTER_SPEED,
    SET_SAVE_TRIGGER,
    SET_LOAD_TRIGGER,
    SET_STOP_POINTER_TRIGGER,
    SET_NEW_LINE_FLAG,
    SET_IS_UNDOED,
    SET_POINTER,
    SET_IS_ALL_SAVED,
    SET_IS_ITEM_LIST,
    SET_ITEM_STACK,
    SET_LAST_POINT,
} from './types';

export default {
    namespaced: true,
    state: {
        //>>>>>>>>>>>>>>>>>>>
        itemList: [], //{line: ラインオブジェクト, lastPoint: ライン最後の座標}
        itemStack: [],
        isUndoed: false,
        isAllSaved: false,
        pointer: {
            x: 0,
            y: 0,
        },
        newLineFlag: true,
        //<<<<<<<<<<<<<<<<<<<<
        mode: Config.mode.EtchASketch, //
        color: '#000000',
        weight: 3,
        pointerSpeed: {
            up: { keys: ['d'], value: false },
            down: { keys: ['f'], value: false },
            right: { keys: ['k'], value: false },
            left: { keys: ['j'], value: false },
        },
        undoTrigger: false,
        redoTrigger: false,
        saveTrigger: false,
        loadTrigger: false,
        stopPointerTrigger: false,
    },
    getters: {
        getLastPoint ({ state }) {
            const l = state.itemList.length - 1
            return state.itemList[l].lastPoint;
        },
        getPointerClone({state}){
            const {x, y} = state.pointer
            return { x , y }
        },
    },
    actions: {
        //>>>>>>>>>>>>>>>>>>>
        /**
         * Pointer
         */
        stopPointer({state, dispatch}) {
            Object.keys(state.pointerSpeed).forEach((direction) => {
                dispatch('setPointerSpeed', {
                    direction: direction,
                    value: false
                });
            });
            dispatch('setNewLine');
        },
        movePointer(event) {
            dispatch('setNewLine');
            let stage = event.target.getStage();
            let clickPos = stage.getPointerPosition();
            this.checkOverLimit(clickPos);
            this.pointer.x = clickPos.x;
            this.pointer.y = clickPos.y;
        },
        //<<<<<<<<<<<<<<<<<<<<
        changeMode({ commit }, { mode }) {
            if (!Config.mode[mode]) return false;
            commit(SET_MODE, mode);
            return true;
        },
        changeColor({ commit }, { newColor }) {
            commit(SET_COLOR, newColor);
        },
        changeWeight({ commit }, { newWeight }) {
            commit(SET_WEIGHT, newWeight);
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
        stopPointer({ commit, state }) {
            commit(SET_STOP_POINTER_TRIGGER);
            console.log(state.stopPointerTrigger);
        },
    },
    mutations: {
        //>>>>>>>>>>>>>>>>>>>
        [SET_NEW_LINE_FLAG](state, bool){
            state.newLineFlag = bool
        },
        [SET_IS_UNDOED](state, bool){
            state.isUndoed = bool
        },
        [SET_IS_ALL_SAVED](state, bool){
            state.isAllSaved = bool
        },
        [SET_POINTER](state, {x, y}){
            state.pointer.x = x;
            state.pointer.y = y;
        },
        [SET_IS_ITEM_LIST](state, itemList){
            state.itemList = itemList
        },
        [SET_ITEM_STACK](state, itemStack){
            state.itemStack = itemStack
        },
        [ SET_LAST_POINT ] (state, { x, y }) {
            const l = state.itemList.length - 1
            state.itemList[l].lastPoint = { x, y };
        },
        //<<<<<<<<<<<<<<<<<<<<
        [SET_MODE](state, mode) {
            state.mode = mode;
        },
        [SET_COLOR](state, color) {
            state.color = color;
        },
        [SET_WEIGHT](state, weight) {
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
    },
};
