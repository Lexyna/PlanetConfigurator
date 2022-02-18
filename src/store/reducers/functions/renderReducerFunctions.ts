import { RenderProps } from "../../../types/storeType";
import { UpdateAnimateAction, UpdateFpsAction } from "../../actions/renderActions";

export const updateAnimate = (state: RenderProps, action: UpdateAnimateAction): RenderProps => {
    return {
        ...state,
        animate: action.payload
    }
}

export const updateFps = (state: RenderProps, action: UpdateFpsAction): RenderProps => {
    return {
        ...state,
        fps: action.payload
    }
}