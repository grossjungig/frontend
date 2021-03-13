import { updateObject } from '../utils';
import { AUTH_LOGOUT } from './types';

const initialState = {
    userId: null,
    token: null, // isAuth = !!token
    user: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGOUT: return authLogout(state, action)
    
        default:
            break;
    }

    return state;
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    });
};

export default reducer;
