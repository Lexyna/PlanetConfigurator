import { RenderProps } from "../../../types/storeType";
import { UpdateAnimateAction, UpdateFpsAction, UpdateKeyframeAction, UpdatePixelSizeAction } from "../../actions/renderActions";

export const updateAnimate = (state: RenderProps, action: UpdateAnimateAction): RenderProps => {
    return {
        ...state,
        animate: action.payload
    }
}

export const updateFps = (state: RenderProps, action: UpdateFpsAction): RenderProps => {
    if (!action.payload || action.payload < 1 || action.payload > 60)
        return state;

    return {
        ...state,
        fps: action.payload
    }
}

export const updatePixelSize = (state: RenderProps, action: UpdatePixelSizeAction): RenderProps => {
    if (!action.payload || action.payload < 1 || action.payload > 20)
        return state;

    return {
        ...state,
        pixelSize: action.payload
    }
}

export const updateKeyframe = (state: RenderProps, action: UpdateKeyframeAction): RenderProps => {
    if (!action.payload || action.payload < 0)
        return state;

    return {
        ...state,
        keyframe: action.payload
    }
}