import axios from '../../axios';
import {} from './actions';

export const dispatchLogin = (email, pwd) => {
    return async (dispatch) => {
        // dispatch(authStart());

        // const authData = { email, pwd };

        try {
            const response = await axios.post(`api/auth/login`, {
                email: email,
                password: pwd,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
};