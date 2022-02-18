import { renderActionType } from "../action-types/renderActionType";

export interface UpdateAnimateAction {
    type: renderActionType.UPDATE_ANIMATE,
    payload: boolean
}

export interface UpdateFpsAction {
    type: renderActionType.UPDATE_FPS,
    payload: number
}