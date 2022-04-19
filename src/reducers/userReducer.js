/* eslint-disable import/no-anonymous-default-export */
import { actionsTypes } from '../constants';


const INITIAL_STATE = {
    users: [],
    countUser: [],
    countTechnician:[],
    user:[]
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case actionsTypes.GET_COUNT_USER:
            return { ...state,  
                countUser: action.payload.user,
                countTechnician: action.payload.technician,
            }
        case actionsTypes.CREATE_USER:
            return { ...state, user: action.payload,
            }
        case actionsTypes.UPDATE_USER:
            return { ...state, user: action.payload,
            }
        case actionsTypes.GET_USER:
            return { ...state, ...action.payload.data }
      default: 
          return state;
    }
}