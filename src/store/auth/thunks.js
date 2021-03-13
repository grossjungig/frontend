import axios from '../../axios';
import * as actions from './actions';

export const dispatchLogin = (email, pwd) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`api/auth/login`, {
                email: email,
                password: pwd,
            });
            const { token, user, expiresInSec } = res.data
            dispatch(actions.authSuccess(token, user));
            dispatch(actions.setTokenExpiration(expiresInSec));
        } catch (error) {
            console.log(error);
        }
    }
};

export const dispatchCheckAuth = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(actions.logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const isTokenExpired = expirationDate <= new Date();
            if (isTokenExpired) {
                dispatch(actions.logout())
            } else {

                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
                const res = await axios.get('/api/auth/relogin', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const user = res.data.user
                dispatch(actions.authSuccess(token, user));
                dispatch(actions.setTokenExpiration(expiresIn));
            }
        }
    }
};