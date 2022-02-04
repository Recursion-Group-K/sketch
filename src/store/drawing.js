import Config from '../config';
import {
    CHNAGE_MODE,
    CHANGE_COLOR,
    CHANGE_WEIGHT,
    SET_UNDOTRIGGER,
    SET_REDOTRIGGER,
    SET_POINTERSPEED,
    SET_SAVETRIGGER,
    SET_STOPPOINTERTRIGGER,
    TOGGLE_ISPUBLIC,
    DRAWING_SAVE_BEGIN,
    DRAWING_SAVE_SUCCESS,
    DRAWING_SAVE_FAILURE,
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

        hasError: false,
        isLoading: false,
        isPublic: false,
        undoTrigger: false,
        redoTrigger: false,
        saveTrigger: false,
        stopPointerTrigger: false,
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
        [SET_STOPPOINTERTRIGGER](state) {
            state.stopPointerTrigger = !state.stopPointerTrigger;
        },
        [TOGGLE_ISPUBLIC](state) {
            state.isPublic = !state.isPublic;
        },
    },
};
