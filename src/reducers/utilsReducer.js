/* eslint-disable import/no-anonymous-default-export */
import { actionsTypes } from '../constants';

const INITIAL_STATE = {
    darkMode: false,
    menu_open: false,
    page_create_user: false,
    page_choose_user: false,
    page_edit_model: false,
    page_choose_model: false,
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionsTypes.TOGGLE_MENU:
            return { ...state, menu_open: action.payload}
        case actionsTypes.PAGE_CREATE_USER:
            return { ...state, page_create_user: action.payload}
        case actionsTypes.PAGE_CHOOSE_USER:
            return { ...state, page_choose_user: action.payload}
         case actionsTypes.PAGE_EDIT_MODEL:
            return { ...state, page_edit_model: action.payload}
        case actionsTypes.PAGE_CHOOSE_MODEL:
            return { ...state, page_choose_model: action.payload}
        case actionsTypes.DARK_MODE:
            return { ...state, darkMode: action.payload}
        default: 
            return state;
    }
}   