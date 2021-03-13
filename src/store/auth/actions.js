import { AUTH_LOGOUT, AUTH_SUCCESS } from './types';

export const dispatchTryAutoSignIn = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));

                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(setAuthTimeout(expiresIn));
            }
        }
    }
};

// const authStart = () => {
//     return {
//         type: AUTH_START
//     };
// };

const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

const setAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    };
};
