import { nanoid } from "nanoid";
import { stat } from "node:fs";
import { text } from "node:stream/consumers";
import { store } from "../../store/store";
import { CloudProps, CloudsProps } from "../../types/cloudProp";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import planet from "../planet/planet";
import { randomRange } from "../Random/randomUtils";
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
    const depth = 120;

    const radius = planet.radius;

    const maskRadius = 10;

    const weight = pixelMatrix.pixelWeight;

    const posX = -weight + randomRange(-radius, radius) * weight;
    const posY = -weight + randomRange(-radius, radius) * weight;

    console.log("Pos: " + posX + "  - " + posY)

    return {
        texture: create3DSimplexNoiseMap(seed, maskRadius, maskRadius, depth),
        seed: seed,
        color: cerateRGBColor(255, 255, 255, 255),
        id: nanoid(),
        maskRadius: maskRadius,
        depth: depth,
        startFrame: Animator.getAnimationFrame(),
        transition: false,
        transitionFrames: 0,
        positionX: posX,
        positionY: posY
    }
}

