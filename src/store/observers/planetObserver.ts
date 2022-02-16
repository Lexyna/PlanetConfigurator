import { observer } from "redux-observers";
import { updatePlanet } from "../../Logic/planet/planet";
import { Animator } from "../../Logic/renderer/Animator";
import { Renderer } from "../../Logic/renderer/Renderer";
import { radiusSelector } from "../selectors/planetSelector";

export const planetRadiusObserver = observer(
    radiusSelector,
    (dispatch, current, previous) => {
        updatePlanet();
        if (!Animator.isAnimating())
            Renderer.getInstance().render(Animator.getAnimationFrame());
    }
)