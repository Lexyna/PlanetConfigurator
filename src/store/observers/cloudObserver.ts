import { observer } from "redux-observers";
import { updateClouds } from "../../Logic/clouds/cloud";
import { Animator } from "../../Logic/renderer/Animator";
import { Renderer } from "../../Logic/renderer/Renderer";
import { cloudsSelector } from "../selectors/cloudSelector";
import { majorCloudsChange, minorCloudsChange } from "./observerUtils";

export const minorCloudObserver = observer(
    cloudsSelector,
    (dispatch, current, previous) => {
        updateClouds();
        if (!Animator.isAnimating())
            Renderer.getInstance().render(Animator.getAnimationFrame());
    },
    {
        equals: minorCloudsChange
    }
)

export const majorCloudObserver = observer(
    cloudsSelector,
    (dispatch, current, previous) => {
    },
    {
        equals: majorCloudsChange
    }
)