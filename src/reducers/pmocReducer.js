/* eslint-disable import/no-anonymous-default-export */
import { actionsTypes } from '../constants';


const INITIAL_STATE = {
    pmoc_mold: [],
    pmoc_title: [],
    pmoc_option: [],
}
export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionsTypes.GET_PMOC_MOLD:
            return { ...state,  pmoc_mold:action.payload.data}
        case actionsTypes.GET_PMOC_TITLE:
            return { ...state, pmoc_title: action.payload.data}
        case actionsTypes.GET_PMOC_OPTION:
            return { ...state, pmoc_option: action.payload.data}
      default: 
          return state;
    }
}