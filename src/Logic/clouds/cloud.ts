import { nanoid } from "nanoid";
import { text } from "node:stream/consumers";
import { CloudProps } from "../../types/cloudProp";
import { create3DSimplexNoiseMap } from "../Random/simplexNoise";
import { Animator } from "../renderer/Animator";
import { cerateRGBColor } from "../utils/utils";

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

