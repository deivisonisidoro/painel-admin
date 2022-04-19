import { actionsTypes } from '../constants';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = { 
    isAuthenticated:  process.env.NODE_ENV === 'production' ? false : true
 }, action) {
    switch(action.type) {
        case actionsTypes.LOGIN_REQUEST:
            return { ...state, data: action.payload, isAuthenticated: true } 
        case actionsTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            }
        default: 
            return state;
    }
}