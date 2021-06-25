import userReducer from "./reducers/userReducer";
import {combineReducers} from "redux";
import exerciseReducer from "./reducers/exerciseReducer";

const rootReducer = combineReducers({
    user: userReducer,
    exercise: exerciseReducer,
})

export default rootReducer
