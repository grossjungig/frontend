import { AUTH_FAIL, AUTH_LOGOUT, AUTH_SUCCESS } from './types';

// ---------- Shared with thunks.js: ----------

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    };
};

export const setTokenExpiration = (sec) => {
    const milliSec = sec * 1000;
    const currentTime = new Date().getTime();
    const expirationDate = new Date(currentTime + milliSec);
    localStorage.setItem('expirationDate', expirationDate);
    return (dispatch) => {
        setTimeout(
            () => { dispatch(logout()); },
            milliSec
        );
    }
}

export const onAuthSuccess = (token, user) => {
    localStorage.setItem('token', token);

    return {
        type: AUTH_SUCCESS,
        token: token,
        user: user,
    };
};

export const onAuthFail = (err) => {
    const errMsg = err.response.data.message;
    return {
        type: AUTH_FAIL,
        errMsg: errMsg
    };
}
