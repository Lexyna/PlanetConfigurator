import { Dispatch } from "react"
import { ColorMapping } from "../../types/planetProp"
import { planetActionType } from "../action-types/planetActionType"
import { AddColorMappingAction, RemoveColorMappingAction, UpdateColorMappingAction, UpdateRadiusAction, UpdateSeedAction } from "../actions/planetAction"

export const updatePlanetRadius = (radius: number) => {
    return (dispatch: Dispatch<UpdateRadiusAction>) => {
        dispatch({
            type: planetActionType.UPDATE_RADIUS,
            payload: radius
        })
    }
}

export const updateSeed = (seed: string) => {
    return (dispatch: Dispatch<UpdateSeedAction>) => {
        dispatch({
            type: planetActionType.UPDATE_SEED,
            payload: seed
        })
    }
}

export const addColorMapping = (mapping: ColorMapping) => {
    return (dispatch: Dispatch<AddColorMappingAction>) => {
        dispatch({
            type: planetActionType.ADD_COLOR_MAPPING,
            payload: mapping
        })
    }
}

export const updateColorMapping = (mapping: ColorMapping) => {
    return (dispatch: Dispatch<UpdateColorMappingAction>) => {
        dispatch({
            type: planetActionType.UPDATE_COLOR_MAPPING,
            payload: mapping
        })
    }
}

export const removeColorMapping = (id: string) => {
    return (dispatch: Dispatch<RemoveColorMappingAction>) => {
        dispatch({
            type: planetActionType.REMOVE_COLOR_MAPPING,
            payload: id
        })
    }
}