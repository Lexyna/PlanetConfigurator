import { Dispatch } from "react"
import { renderActionType } from "../action-types/renderActionType"
import { UpdateAnimateAction, UpdateFpsAction } from "../actions/renderActions"

export const updateRenderSettingAnimate = (animate: boolean) => {
    return (dispatch: Dispatch<UpdateAnimateAction>) => {
        dispatch({
            type: renderActionType.UPDATE_ANIMATE,
            payload: animate
        })
    }
}

export const updateRenderSettingsFps = (fps: number) => {
    return (dispatch: Dispatch<UpdateFpsAction>) => {
        dispatch({
            type: renderActionType.UPDATE_FPS,
            payload: fps
        })
    }
}