import axios from 'axios';

export const authenticate = (username, password) => (dispatch) => {
    dispatch({ type: 'AUTHENTICATE_REQUEST' });

    return axios
        .post('http://localhost:9000/api/user/login', { username, password })
        .then((res) => {
            console.log('Dane z serwera:', res.data); // Sprawdź czy tu jest userID!
            dispatch({
                type: 'AUTHENTICATE_SUCCESS',
                payload: res.data // wysyłamy tylko dane
            });
        })
        .catch((err) => {
            console.log('Błąd logowania:', err);
            dispatch({ type: 'AUTHENTICATE_FAILURE' });
        });
};