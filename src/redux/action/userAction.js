export const FETCH_LOGIN_USER_SUCCESS = "FETCH_LOGIN_USER_SUCCESS";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const UPDATE_INFO_USER_SUCCESS = "UPDATE_INFO_USER_SUCCESS";

export const doLogin = (data) => {
    return {
        type: FETCH_LOGIN_USER_SUCCESS,
        payload: data,
    };
};

export const doLogout = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
    };
};

export const doUpdateInfo = (payload) => {
    return {
        type: UPDATE_INFO_USER_SUCCESS,
        payload
    };
};
