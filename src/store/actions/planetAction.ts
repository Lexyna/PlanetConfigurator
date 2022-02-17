import { ColorMapping } from "../../types/planetProp";
import { planetActionType } from "../action-types/planetActionType";


export interface UpdateRadiusAction {
    type: planetActionType.UPDATE_RADIUS,
    payload: number
}

export interface AddColorMappingAction {
    type: planetActionType.ADD_COLOR_MAPPING,
    payload: ColorMapping
}

export interface UpdateColorMappingAction {
    type: planetActionType.UPDATE_COLOR_MAPPING,
    payload: ColorMapping
}

export interface RemoveColorMappingAction {
    type: planetActionType.REMOVE_COLOR_MAPPING,
    payload: string
}