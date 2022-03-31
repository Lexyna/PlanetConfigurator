import { combineReducers } from "redux";
import cloudReducer from "./cloudReducer";
import planetReducers from "./planetReducer";
import renderReducers from "./renderReducer";



const reducers = combineReducers({
    planet: planetReducers,
    renderSettings: renderReducers,
    cloudSettings: cloudReducer
});

export default reducers;