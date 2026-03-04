// src/reducer/authReducer.js
const initialState = {
    userID: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE_SUCCESS':
            return {
                ...state,
                userID: action.payload.userID,
            };
        default:
            return state;
    }
};

export default authReducer;