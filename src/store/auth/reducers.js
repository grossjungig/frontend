import { updateObject } from '../utils';
import { AUTH_LOGOUT, AUTH_SUCCESS } from './types';

const initialState = {
    userId: null,
    token: null, // isAuth = !!token
    user: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGOUT: return authLogout(state)
        case AUTH_SUCCESS: return authLogin(state, action)
        default:
            break;
    }

    return state;
};

const authLogin = (state, action) => {
    return updateObject(state, {
        token: action.token,
        userId: action.userId
    })
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null,
    });
};


export default reducer;
