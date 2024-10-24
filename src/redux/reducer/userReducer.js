import { FETCH_LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../action/userAction";
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

        default:
            return state;
    }
};

export default userReducer;
