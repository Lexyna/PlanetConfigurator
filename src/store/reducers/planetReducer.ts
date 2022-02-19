import { nanoid } from "nanoid";
import { cerateRGBColor } from "../../Logic/utils/utils";
import { PlanetProps } from "../../types/planetProp";
import { planetActionType } from "../action-types/planetActionType";
import { addColorMapping, removeColorMapping, updateColorMapping, updateRadius, updateSeed } from "./functions/planetReducerFunctions";
import reducerFactory, { IHandler } from "./reducerFactory";


const initialState: PlanetProps = {
    radius: 20,
    seed: nanoid(),
    colorMapping: [
        {
            id: nanoid(),
            value: 0.35,
            color: cerateRGBColor(29, 43, 83, 255)
        },
        {
            id: nanoid(),
            value: 0.45,
            color: cerateRGBColor(41, 173, 255, 255)
        },
        {
            id: nanoid(),
            value: 0.55,
            color: cerateRGBColor(0, 228, 54, 255)
        },
        {
            id: nanoid(),
            value: 0.7,
            color: cerateRGBColor(0, 135, 81, 255)
        },
        {
            id: nanoid(),
            value: 1,
            color: cerateRGBColor(95, 87, 79, 255)
        }
    ]
}

const handlers: IHandler = {};

handlers[planetActionType.UPDATE_RADIUS] = updateRadius;
handlers[planetActionType.UPDATE_SEED] = updateSeed;
handlers[planetActionType.ADD_COLOR_MAPPING] = addColorMapping;
handlers[planetActionType.UPDATE_COLOR_MAPPING] = updateColorMapping;
handlers[planetActionType.REMOVE_COLOR_MAPPING] = removeColorMapping;

const planetReducers = reducerFactory(initialState, handlers);

export default planetReducers;
