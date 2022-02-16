import { renderActionType } from "../action-types/renderActionType";

export interface UpdateAnimateAction {
    type: renderActionType.UPDATE_ANIMATE,
    payload: boolean
}