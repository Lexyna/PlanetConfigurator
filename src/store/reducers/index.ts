import { combineReducers } from "redux";
import planetReducers from "./planetReducer";
import renderReducers from "./renderReducer";



const reducers = combineReducers({
    planet: planetReducers,
    renderSettings: renderReducers
});

export default reducers;