import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import utilsReducer from './utilsReducer';
import pmocReducer from './pmocReducer';


const reducers = combineReducers({ 
    authReducer,
    userReducer,
    utilsReducer,
    pmocReducer
})

export { reducers }