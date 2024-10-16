export const FETCH_LOGIN_USER_SUCCESS = "FETCH_LOGIN_USER_SUCCESS";

export const doLogin = (data) => {
    return {
        type: FETCH_LOGIN_USER_SUCCESS,
        payload: data,
    };
};
