import { INCREMENT, DECREMENT } from "../action/counterAction";
import { FETCH_LOGIN_USER_SUCCESS } from "../action/userAction";
const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
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

        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        default:
            return state;
    }
};

export default userReducer;
