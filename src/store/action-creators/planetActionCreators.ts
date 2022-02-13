import { Dispatch } from "react"
import { planetActionType } from "../action-types/planetActionType"
import { UpdateRadiusAction } from "../actions/planetAction"

export const updatePlanetRadius = (radius: number) => {
    return (dispatch: Dispatch<UpdateRadiusAction>) => {
        dispatch({
            type: planetActionType.UPDATE_RADIUS,
            payload: radius
        })
    }
}