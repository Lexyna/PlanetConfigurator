import { REPL_MODE_SLOPPY } from "repl";
import { minorCloudsChange } from "../../store/observers/observerUtils";
import { store } from "../../store/store";
import { CloudProps } from "../../types/cloudProp";
import { CloudTemplate } from "../../types/cloudTemplate";
import { State } from "../../types/storeType";
import { create3DSimplexNoiseMap } from "../Random/simplexNoise";
import { clouds } from "./cloud";

export const convertClouds = (prop: CloudProps): CloudTemplate => {

    return {
        texture: create3DSimplexNoiseMap(prop.seed, prop.maskRadius, prop.maskRadius, prop.depth),
        color: prop.color,
        seed: prop.seed,
        id: prop.id,
        maskRadius: prop.maskRadius,
        pixelPositionX: prop.pixelPositionX,
        pixelPositionY: prop.pixelPositionY,
        depth: prop.depth,
        startFrame: prop.startFrame,
        static: prop.static,
        transition: prop.transition,
        transitionFrames: prop.transitionFrames
    }

}

export const addCloud = () => {

    const state: State = store.getState();

    const storeClouds = state.cloudSettings.clouds;

    for (let i = 0; i < storeClouds.length; i++) {

        let isNewCloud = true;

        for (let j = 0; j < clouds.length; j++) {
            if (storeClouds[i].id === clouds[j].id)
                isNewCloud = false;
        }

        if (isNewCloud) {
            clouds.push(convertClouds(storeClouds[i]))
            return;
        }
    }
}

export const removeCloud = () => {
    const state: State = store.getState();

    const storeClouds = state.cloudSettings.clouds;

    for (let i = 0; i < clouds.length; i++) {

        let isOldCloud = true;

        for (let j = 0; j < storeClouds.length; j++) {
            if (clouds[i].id === storeClouds[j].id)
                isOldCloud = false;
        }

        if (isOldCloud) {
            clouds.splice(i, 1);
            return;
        }
    }

}

export const updateCloudAt = () => {

    const state: State = store.getState();

    const storeClouds = state.cloudSettings.clouds;

    for (let i = 0; i < storeClouds.length; i++) {

        for (let j = 0; j < clouds.length; j++) {
            if (storeClouds[i].id === clouds[j].id)
                if (!minorCloudsChange([storeClouds[i]], [clouds[j]])) {
                    clouds[j].color = storeClouds[i].color;
                    clouds[j].pixelPositionX = storeClouds[i].pixelPositionX;
                    clouds[j].pixelPositionY = storeClouds[i].pixelPositionY;
                    clouds[j].static = storeClouds[i].static;
                    clouds[j].startFrame = storeClouds[i].startFrame;
                    clouds[j].transition = storeClouds[i].transition;
                    clouds[j].transitionFrames = storeClouds[i].transitionFrames;
                }
        }
    }

}