import { PlanetProps } from "../../../types/planetProp";
import { UpdateRadiusAction } from "../../actions/planetAction";

export const updateRadius = (state: PlanetProps, action: UpdateRadiusAction): PlanetProps => {
    if (!action.payload || action.payload < 4 || action.payload > 64)
        return state;

    return {
        ...state,
        radius: action.payload
    }
}