const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                user: null,
                isLoading: true,
                error: null
            }
        case 'LOGIN_SUCCESS':
            return {
            ...state,
            user: action.payload.user,
            isLoading: false,
            error: null,
            accessToken: action.payload.accessToken
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                isLoading: false,
                error: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                accessToken: null
            }
        case 'REFRESH_TOKEN_SUCCESS':
            return {
                ...state,
                accessToken: action.payload.accessToken
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.payload.user
            }
        default:
            return state;
    }
}
export default AuthReducer;