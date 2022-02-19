import { renderActionType } from "../action-types/renderActionType";

export interface UpdateAnimateAction {
    type: renderActionType.UPDATE_ANIMATE,
    payload: boolean
}

export interface UpdateFpsAction {
    type: renderActionType.UPDATE_FPS,
    payload: number
}

export interface UpdatePixelSizeAction {
    type: renderActionType.UPDATE_PIXEL_WEIGHT;
    payload: number
}

export interface UpdateKeyframeAction {
    type: renderActionType.UPDATE_KEYFRAME;
    payload: number
}