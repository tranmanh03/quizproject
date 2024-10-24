import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    account: userReducer,
});

export default rootReducer;
