
const init = {
    load: true,
    token: null,
    user: null,
    message: "",
    err: null
}

const authReducer = (state = init, action) => {
    switch (action?.type) {
        case 'AUTH_INIT':
            return init
            case 'AUTH_LOGIN_SUCCESS':
                return {
                    ...state,
                    token: action?.payload?.token
                }
        case 'AUTH_PROFILE_SUCCESS':
            return {
                ...state,
                user: action?.payload?.data
            }
        case 'AUTH_REGISTER_SUCCESS':
            return {
                ...state,
                token: action?.payload?.token,
                err: null
            }
        case 'AUTH_REGISTER_FAIL':
            return {
                ...state,
                err: action?.payload?.error
            }
        case 'AUTH_LOGIN_FAIL':
            return {
                ...state,
                err: action?.payload?.error
            }
        case 'AUTH_PROFILE_FAIL':
            return {
                ...state,
                err: action?.payload?.error
            }
        default:
            return state
    }
}

export default authReducer