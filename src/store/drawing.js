import Config from '../config';
import {
    CHNAGE_MODE,
    CHANGE_COLOR,
    CHANGE_WEIGHT,
    SET_UNDOTRIGGER,
    SET_REDOTRIGGER,
    SET_POINTERSPEED,
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
    },
    getters: {
        isEtchASketchMode: (state) => state.mode == Config.mode.EtchASketch,
    },
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
            commit(SET_UNDOTRIGGER);
        },
        redo({ commit }) {
            commit(SET_REDOTRIGGER);
        },
        setPointerSpeed({ commit }, { direction, value }) {
            commit(SET_POINTERSPEED, { direction: direction, value: value });
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
        [SET_UNDOTRIGGER](state) {
            state.undoTrigger = !state.undoTrigger;
        },
        [SET_REDOTRIGGER](state) {
            state.redoTrigger = !state.redoTrigger;
        },
        [SET_POINTERSPEED](state, payload) {
            state.pointerSpeed[payload.direction].value = payload.value;
        },
    },
};
