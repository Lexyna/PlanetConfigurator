import { observer } from "redux-observers";
import { Animator } from "../../Logic/renderer/Animator";
import { animateSelector } from "../selectors/renderSelector";

export const animateObserver = observer(
    animateSelector,
    () => {
        Animator.changeAnimationStatus();
    }
)