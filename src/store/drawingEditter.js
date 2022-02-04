import Config from '../config';
import {
    CHNAGE_MODE,
    CHANGE_COLOR,
    CHANGE_WEIGHT,
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
    getters: {},
    actions: {
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
        stopPointer({ commit, state }) {
            commit(SET_STOP_POINTER_TRIGGER);
            console.log(state.stopPointerTrigger);
        },
    },
    mutations: {
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
    },
};
