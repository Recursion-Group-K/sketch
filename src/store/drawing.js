import Config from '../config';
import { CHNAGE_MODE } from './types';

export default {
    namespaced: true,
    state: {
        mode: Config.mode.EtchASketch,
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
    },
    mutations: {
        [CHNAGE_MODE](state, mode) {
            state.mode = mode;
        },
    },
};
