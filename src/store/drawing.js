import Config from '../config';
import { 
    CHNAGE_MODE, 
    CHANGE_COLOR, 
    CHANGE_WEIGHT, 
    SET_UNDOFLAG,
    SET_REDOFLAG,
} from './types';

export default {
    namespaced: true,
    state: {
        mode: Config.mode.EtchASketch,
        color: '#000000',
        weight: 3,
        undoFlag: false,
        redoFlag: false,
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
        changeColor({ commit, state }, { newColor }) {
            commit(CHANGE_COLOR, newColor);
            console.log(state.color);
        },
        changeWeight({ commit }, { newWeight }) {
            commit(CHANGE_WEIGHT, newWeight);
        },
        undo({commit}) {
            commit(SET_UNDOFLAG);
        },
        redo({commit}){
            commit(SET_REDOFLAG);
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
        [SET_UNDOFLAG](state){
            state.undoFlag = !state.undoFlag;
        },
        [SET_REDOFLAG](state){
            state.redoFlag=!state.redoFlag;
        }
    },
};

