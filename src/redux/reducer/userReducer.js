import { FETCH_LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS, UPDATE_INFO_USER_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
        email: ""
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOGIN_USER_SUCCESS:
            return {
                ...state,
                account: { ...action.payload.DT },
                isAuthenticated: true,
            };

        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    username: "",
                    image: "",
                    role: "",
                    email: ""
                },
                isAuthenticated: false,
            }
        case UPDATE_INFO_USER_SUCCESS:
            let newAccount = state.account;
            return {
                ...state,
                account: { 
                    ...newAccount,
                    username: action.payload.username,
                    image: action.payload.imageb64
                },
                isAuthenticated: true,
            };    
        default:
            return state;
    }
};

export default userReducer;
