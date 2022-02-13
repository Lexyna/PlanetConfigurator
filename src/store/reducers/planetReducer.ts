import { PlanetProps } from "../../types/planetProp";
import { planetActionType } from "../action-types/planetActionType";
import { updateRadius } from "./functions/planetReducerFunctions";
import reducerFactory, { IHandler } from "./reducerFactory";


const initialState: PlanetProps = {
    radius: 20
}

const handlers: IHandler = {};

handlers[planetActionType.UPDATE_RADIUS] = updateRadius;

const planetReducers = reducerFactory(initialState, handlers);

export default planetReducers;
