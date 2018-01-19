export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_INFO_FAIL = 'SET_USER_INFO_FAIL';
export const SET_USER_LOADING = 'SET_USER_LOADING';

// ------------------------------------
// Actions
// ------------------------------------
export const setUserToken = (token) => {
    localStorage.setItem('token', token);
    return {
        type: SET_USER_TOKEN,
        token: token
    }
};


export const loadUserPrepare = () => {
    return {
        type: SET_USER_LOADING,
    }
};
export const loadUser = (user) => {
    localStorage.setItem('token', user.token);
    return {
        type: SET_USER_INFO,
        info: user
    }
};
export const loadUserFAIL = () => {
    return {
        type: SET_USER_INFO_FAIL
    }
};


export const logoutUser = () => {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
        token: ''
    };
};

export const actions = {
    setUserToken,
    loadUser,
    loadUserFAIL,
    logoutUser,
    loadUserPrepare
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [SET_USER_TOKEN]    : (state, action) => {
        return {
            ...initialState,
            loading: true,
            token: action.token,
        };},
    [SET_USER_LOADING]    : (state, action) => {
        return {
            ...initialState,
            loading: true,
        };},
    [SET_USER_INFO]    : (state, action) => {
        return {
            ...initialState,
            loading: false,
            info: action.info,
            token: action.info.token,
        };},
    [SET_USER_INFO_FAIL]    : (state, action) => {
        return {
            ...initialState,
            loading: false,
            token: '',
        };},
    [LOGOUT_USER] : (state, action) => {return {
        ...state,
        successMessage: action.message,
        loading: false,
        token: ''
    };},
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    token: '',//localStorage.getItem('token'),
    info: '',//localStorage.getItem('token')
    loading:true,
};
export default function userReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
   // console.log(handler);
    //console.log(state);
    //action.payload = {};
    return handler ? handler(state, action) : state
}
