import { PlanetProps } from "../../types/planetProp";
import { State } from "../../types/storeType";
import { planetActionType } from "../action-types/planetActionType";
import { UpdateRadiusAction } from "../actions/planetAction";
import reducerFactory, { IHandler } from "./reducerFactory";


const initialState: PlanetProps = {
    radius: 20
}

const handlers: IHandler = {};

handlers[planetActionType.UPDATE_RADIUS] = (state: State, action: UpdateRadiusAction) => {
    return {
        ...state.planet,
        radius: action.payload
    }
}

const planetReducers = reducerFactory(initialState, handlers);

export default planetReducers;
