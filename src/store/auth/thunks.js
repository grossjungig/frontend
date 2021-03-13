import axios from '../../axios';
import * as actions from './actions';

export const dispatchLogin = (email, pwd) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`api/auth/login`, {
                email: email,
                password: pwd,
            });
            const { token, userId, expiresInSec } = res.data
            dispatch(actions.authSuccess(token, userId));
            dispatch(actions.setTokenExpiration(expiresInSec));
        } catch (error) {
            console.log(error);
        }
    }
};