import { observer } from "redux-observers";
import { updateNoiseMap, updatePlanet, updatePlanetColorMapping } from "../../Logic/planet/planet";
import { Animator } from "../../Logic/renderer/Animator";
import { Renderer } from "../../Logic/renderer/Renderer";
import { colorMappingSelector, radiusSelector, seedSelector, sim3DTerrainSelector } from "../selectors/planetSelector";
import { compareColorMappings } from "./observerUtils";

export const planetRadiusObserver = observer(
    radiusSelector,
    (dispatch, current, previous) => {
        updatePlanet();
        if (!Animator.isAnimating())
            Renderer.getInstance().render(Animator.getAnimationFrame());
    }
)

export const planetSeedObserver = observer(
    seedSelector,
    (dispatch, current, previous) => {
        updateNoiseMap();
        if (!Animator.isAnimating())
            Renderer.getInstance().render(Animator.getAnimationFrame());
    }
)

export const planetAnimateObserver = observer(
    sim3DTerrainSelector,
    (dispatch, current, previous) => {
        updateNoiseMap();
        if (!Animator.isAnimating())
            Renderer.getInstance().render(Animator.getAnimationFrame());
    }
)

export const colorMappingsObserver = observer(
    colorMappingSelector,
    (dispatch, current, previous) => {
        updatePlanetColorMapping();
        if (!Animator.isAnimating())
            Renderer.getInstance().render(Animator.getAnimationFrame());
    },
    {
        equals: compareColorMappings
    }
)