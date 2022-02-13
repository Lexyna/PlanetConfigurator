import { combineReducers } from "redux";
import planetReducers from "./planetReducer";



const reducers = combineReducers({
    planet: planetReducers,
});

export default reducers;