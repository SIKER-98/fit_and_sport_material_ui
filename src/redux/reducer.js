import userReducer from "./reducers/userReducer";
import {combineReducers} from "redux";
import exerciseReducer from "./reducers/exerciseReducer";
import planReducer from "./reducers/planReducer";
import planInfoReducer from "./reducers/planInfoReducer";

const rootReducer = combineReducers({
    user: userReducer,
    exercise: exerciseReducer,
    plan: planReducer,
    planInfo: planInfoReducer,
})

export default rootReducer
