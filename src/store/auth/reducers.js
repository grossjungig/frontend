import { updateObject } from '../utils';
import { AUTH_LOGOUT, AUTH_SUCCESS, AUTH_FAIL } from './types';

const initialState = {
    token: null, // isAuth = !!token
    user: null,
    errMsg: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGOUT: return authLogout(state);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        default:
            break;
    }

    return state;
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        user: action.user
    });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        user: null,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        errMsg: action.errMsg
    });
};


export default reducer;
