import { nanoid } from "nanoid";
import { stat } from "node:fs";
import { text } from "node:stream/consumers";
import { store } from "../../store/store";
import { CloudProps, CloudsProps } from "../../types/cloudProp";
import { State } from "../../types/storeType";
import { create3DSimplexNoiseMap } from "../Random/simplexNoise";
import { Animator } from "../renderer/Animator";
import { cerateRGBColor } from "../utils/utils";

export const clouds: CloudsProps = {
    clouds: []
};

export const updateClouds = () => {
    const state: State = store.getState();

    clouds.clouds = state.cloudSettings.clouds;
}

export const createCloud = (): CloudProps => {

    const seed = nanoid();
    const width = 8;
    const height = 8;
    const depth = 6;

    return {
        texture: create3DSimplexNoiseMap(seed, width, height, depth),
        seed: seed,
        color: cerateRGBColor(255, 255, 255, 255),
        id: nanoid(),
        width: width,
        height: height,
        depth: depth,
        startFrame: Animator.getAnimationFrame(),
        transition: false,
        transitionFrames: 0,
        positionX: 0,
        positionY: 0
    }
}

