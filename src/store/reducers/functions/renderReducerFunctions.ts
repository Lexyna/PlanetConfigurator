import { RenderProps } from "../../../types/storeType";
import { UpdateAnimateAction } from "../../actions/renderActions";

export const updateAnimate = (state: RenderProps, action: UpdateAnimateAction): RenderProps => {
    return {
        ...state,
        animate: action.payload
    }
}