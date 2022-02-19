import { observer } from "redux-observers";
import { updatePixelMatrix } from "../../Logic/matrix/matrixUtils";
import { Animator } from "../../Logic/renderer/Animator";
import { animateSelector, fpsSelector, pixelSizeSelector } from "../selectors/renderSelector";

export const animateObserver = observer(
    animateSelector,
    (dispatch, previous, current) => {
        if (previous !== current)
            Animator.changeAnimationStatus();
    }
)

export const fpsObserver = observer(
    fpsSelector,
    () => {
        Animator.updateFPS();
    }
)

export const pixelSizeObserver = observer(
    pixelSizeSelector,
    () => {
        updatePixelMatrix();
    }
)