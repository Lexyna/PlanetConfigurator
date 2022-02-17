import { PlanetProps } from "../../../types/planetProp";
import { AddColorMappingAction, RemoveColorMappingAction, UpdateColorMappingAction, UpdateRadiusAction } from "../../actions/planetAction";

export const updateRadius = (state: PlanetProps, action: UpdateRadiusAction): PlanetProps => {
    if (!action.payload || action.payload < 4 || action.payload > 64)
        return state;

    return {
        ...state,
        radius: action.payload
    }
}

export const addColorMapping = (state: PlanetProps, action: AddColorMappingAction): PlanetProps => {
    return {
        ...state,
        colorMapping: state.colorMapping.concat(action.payload)
    }
}

export const updateColorMapping = (state: PlanetProps, action: UpdateColorMappingAction): PlanetProps => {

    const colorMappings = state.colorMapping.slice(0);

    colorMappings.forEach((mapping, index) => {
        if (mapping.id === action.payload.id) {
            mapping.value = action.payload.value;
            mapping.color = action.payload.color;
        }
    })

    return {
        ...state,
        colorMapping: colorMappings
    }

}

export const removeColorMapping = (state: PlanetProps, action: RemoveColorMappingAction): PlanetProps => {

    const newMapping = state.colorMapping.slice(0);
    newMapping.forEach((mapping, index) => {
        if (mapping.id === action.payload)
            newMapping.splice(index, 1);
    })

    return {
        ...state,
        colorMapping: newMapping
    }

}