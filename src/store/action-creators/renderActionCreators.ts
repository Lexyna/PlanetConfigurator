import { Dispatch } from "react"
import { renderActionType } from "../action-types/renderActionType"
import { UpdateAnimateAction, UpdateFpsAction, UpdateKeyframeAction, UpdatePixelSizeAction } from "../actions/renderActions"

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

export const updateRenderSettingPixelSize = (pixelSize: number) => {
    return (dispatch: Dispatch<UpdatePixelSizeAction>) => {
        dispatch({
            type: renderActionType.UPDATE_PIXEL_WEIGHT,
            payload: pixelSize
        })
    }
}

export const updateRenderSettingKeyframe = (keyframe: number) => {
    return (dispatch: Dispatch<UpdateKeyframeAction>) => {
        dispatch({
            type: renderActionType.UPDATE_KEYFRAME,
            payload: keyframe
        })
    }
}