import { nanoid } from "nanoid";
import { cerateRGBColor } from "../../Logic/utils/utils";
import { PlanetProps } from "../../types/planetProp";
import { planetActionType } from "../action-types/planetActionType";
import { addColorMapping, removeColorMapping, updateColorMapping, updateRadius } from "./functions/planetReducerFunctions";
import reducerFactory, { IHandler } from "./reducerFactory";


const initialState: PlanetProps = {
    radius: 20,
    colorMapping: [
        {
            id: nanoid(),
            value: 0.3,
            color: cerateRGBColor(131, 24, 6, 255)
        }
    ]
}

const handlers: IHandler = {};

handlers[planetActionType.UPDATE_RADIUS] = updateRadius;
handlers[planetActionType.ADD_COLOR_MAPPING] = addColorMapping;
handlers[planetActionType.UPDATE_COLOR_MAPPING] = updateColorMapping;
handlers[planetActionType.REMOVE_COLOR_MAPPING] = removeColorMapping;

const planetReducers = reducerFactory(initialState, handlers);

export default planetReducers;
