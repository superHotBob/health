
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

// ------------------------------------
// Actions
// ------------------------------------
export const loginUserRequest = ({ email }) => ({
    type: LOGIN_USER_REQUEST,
    email,
});

export const loginUserSuccess = ({}) => ({
    type: LOGIN_USER_SUCCESS,
    message: 'User logged in successfully!',
});

export const loginUserError = ({ error }) => ({
    type: LOGIN_USER_ERROR,
    message: error.message,
});

export const actions = {
    loginUserRequest,
    loginUserSuccess,
    loginUserError
}
//console.log(1111);
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOGIN_USER_REQUEST]    : (state, { type, ...payload }) => {
        //console.log(payload);
        return {
        ...initialState,
        loading: true,
        email: payload.email,
    };},
    [LOGIN_USER_SUCCESS] : (state, { type, ...payload }) => {return {
        ...state,
        successMessage: payload.message,
        loading: false,
    };},
    [LOGIN_USER_ERROR] : (state, { type, ...payload }) => {return {
        ...state,
        loading: false,
        errorMessage: payload.message,
    };}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    token: null,
    loading: false,
    username: null,
    errorMessage: null,
    alertMessage: null,
};
export default function loginReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    //console.log(action);
    //action.payload = {};
    return handler ? handler(state, action) : state
}
