import { observer } from "redux-observers";
import { Animator } from "../../Logic/renderer/Animator";
import { animateSelector, fpsSelector } from "../selectors/renderSelector";

export const animateObserver = observer(
    animateSelector,
    () => {
        Animator.changeAnimationStatus();
    }
)

export const fpsObserver = observer(
    fpsSelector,
    () => {
        Animator.updateFPS();
    }
)