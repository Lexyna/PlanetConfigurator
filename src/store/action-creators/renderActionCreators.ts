import { Dispatch } from "react"
import { renderActionType } from "../action-types/renderActionType"
import { UpdateAnimateAction } from "../actions/renderActions"

export const updateRenderSettingAnimate = (animate: boolean) => {
    return (dispatch: Dispatch<UpdateAnimateAction>) => {
        dispatch({
            type: renderActionType.UPDATE_ANIMATE,
            payload: animate
        })
    }
}