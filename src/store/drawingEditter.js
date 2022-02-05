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
} from './types';

export default {
    namespaced: true,
    state: {
        mode: Config.mode.EtchASketch,
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
        getLastPoint({ state }) {
            const l = state.itemList.length - 1;
            return state.itemList[l].lastPoint;
        },
        getPointerClone({ state }) {
            const { x, y } = state.pointer;
            return { x, y };
        },
    },
    actions: {
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
        save({ commit }) {
            commit(SET_SAVE_TRIGGER);
        },
        load({ commit }) {
            commit(SET_LOAD_TRIGGER);
        },
    },
    mutations: {
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
