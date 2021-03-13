import { AUTH_LOGOUT, AUTH_SUCCESS } from './types';

export const dispatchAutoLogin = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                console.log('TOKEN EXPIRED!!!');
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(authSuccess(token, userId));
                dispatch(setTokenExpiration(expiresIn));
            }
        }
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    };
};

// ---------- Shared with thunks.js: ----------

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

export const authSuccess = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);

    return {
        type: AUTH_SUCCESS,
        token: token,
        userId: userId,
    };
};
