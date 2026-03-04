import axios from 'axios';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

const authenticate = (username, password, endpoint) => (dispatch) => {
    // endpoint to może być 'login' lub 'register'
    return axios
        .post(`http://localhost:9000/api/user/${endpoint}`, {
            username,
            password,
        })
        .then((payload) => {
            console.log(payload);
            dispatch({ type: AUTH_SUCCESS, payload });
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: AUTH_FAILURE });
            // Możesz tu rzucić błąd, żeby komponent go obsłużył
            throw err;
        });
};

export default authenticate;