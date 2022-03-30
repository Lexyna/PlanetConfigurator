import { RGBA } from "color-blend/dist/types";
import { nanoid } from "nanoid";
import { majorCloudsChange } from "../../store/observers/observerUtils";
import { store } from "../../store/store";
import { Blend, CloudProps } from "../../types/cloudProp";
import { CloudTemplate } from "../../types/cloudTemplate";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import planet from "../planet/planet";
import { randomRange } from "../Random/randomUtils";
import { create3DSimplexNoiseMap, createLooping3DSimplexNoiseMap } from "../Random/simplexNoise";
import { Animator } from "../renderer/Animator";
import { blendColors, cerateRGBColor, hexToRGBA, map, rgbToHex } from "../utils/utils";
import { addCloud, removeCloud, updateCloudAt } from "./cloudUtils";

export const clouds: CloudTemplate[] = []

export const updateClouds = () => {
    const state: State = store.getState();

    if (state.cloudSettings.clouds.length > clouds.length) {
        addCloud();
        return;
    }

    if (state.cloudSettings.clouds.length < clouds.length) {
        removeCloud();
        return;
    }

    updateCloudAt();
}

export const recalculateCloud = () => {

    const state: State = store.getState();

    const storeClouds = state.cloudSettings.clouds;

    for (let i = 0; i < storeClouds.length; i++) {

        for (let j = 0; j < clouds.length; j++) {
            if (storeClouds[i].id === clouds[j].id)
                if (!majorCloudsChange([storeClouds[i]], [clouds[j]])) {
                    clouds[j].seed = storeClouds[i].seed;
                    clouds[j].depth = storeClouds[i].depth;
                    clouds[j].maskRadius = storeClouds[i].maskRadius;
                    clouds[j].looping = storeClouds[i].looping;

                    const texture: number[][][] = (clouds[i].looping) ?
                        createLooping3DSimplexNoiseMap(clouds[i].seed, clouds[i].maskRadius, clouds[i].maskRadius, clouds[i].depth) :
                        create3DSimplexNoiseMap(clouds[i].seed, clouds[i].maskRadius, clouds[i].maskRadius, clouds[i].depth);

                    clouds[j].texture = texture;
                }
        }
    }

}

export const createCloud = (): CloudProps => {

    const seed = nanoid();

    const radius = planet.radius - 2;

    //calculate depth based on time on screen 3* radius
    const depth = 3 * radius;

    const maskRadius = radius + 2;

    const pixelPositionX = randomRange(-radius, radius);
    const pixelPositionY = randomRange(-radius * 2, radius);

    //offset positionX so cloud always starts right of planet
    const offsetX = map(pixelPositionX, -radius, radius, 2 * radius, 0);

    //subtracting the offset form the startFrame, gives us the cloud in the middle of the animation, making it visible on the planet
    //Note: The startFrame cannot be negative, so modulo it.
    let startFrame = (Animator.getAnimationFrame() - offsetX) % planet.noiseMap.length;

    if (startFrame < 0)
        startFrame += planet.noiseMap.length;

    return {
        seed: seed,
        color: cerateRGBColor(255, 255, 255, 255),
        blend: Blend.NORMAL,
        id: nanoid(),
        maskRadius: maskRadius,
        depth: depth,
        startFrame: startFrame,
        transition: false,
        static: false,
        looping: false,
        transitionFrames: 0,
        pixelPositionX: pixelPositionX + offsetX, //we add the offset because it will always be negative 
        pixelPositionY: pixelPositionY
    }
}

export const renderClouds = (buffer: Uint32Array, width: number, animationFrame: number) => {

    const middleX = pixelMatrix.middleX;
    const middleY = pixelMatrix.middleY;

    const weight = pixelMatrix.pixelWeight;

    clouds.forEach(cloud => {

        const startFrame = cloud.startFrame;
        const endFrame = (cloud.startFrame + cloud.depth) % planet.noiseMap.length;

        if (endFrame > startFrame)
            if (!(animationFrame >= startFrame && animationFrame <= endFrame))
                return;
            else
                if (!(animationFrame >= startFrame || animationFrame <= endFrame))
                    return;

        let z = ((animationFrame - startFrame) % planet.noiseMap.length);

        if (z < 0)
            z += planet.noiseMap.length;

        if (z >= cloud.depth)
            return;

        const radius = (cloud.maskRadius / 2);
        const max = radius * radius;

        const halfMaskRadius = cloud.maskRadius / 2;

        for (let x = 0; x < cloud.maskRadius; x++)
            for (let y = 0; y < cloud.maskRadius; y++) {

                const cX = x - halfMaskRadius;
                const cY = y - halfMaskRadius;

                const movement = (cloud.static) ? 0 : z * weight;

                const posX = -weight + cloud.pixelPositionX * weight;
                const posY = -weight + cloud.pixelPositionY * weight;

                const planetX = posX + (x * weight) - movement;
                const planetY = posY + (y * weight);

                if (buffer[(planetY + middleY) * width + (planetX + middleX)] === 0x00000000)
                    continue;

                if (cX * cX + cY * cY > max)
                    continue;

                if (cloud.texture[x][y][z] < 0.6)
                    continue;

                const pixelColor: RGBA = {
                    r: cloud.color.r,
                    g: cloud.color.g,
                    b: cloud.color.b,
                    a: 1
                }

                //set transition
                if (cloud.transition && startFrame + cloud.transitionFrames >= animationFrame) {

                    let alpha = 0;

                    const alphaIncrease = 1 / cloud.transitionFrames;

                    const currentTransitionFrame = animationFrame - startFrame;

                    alpha = (alphaIncrease * currentTransitionFrame);

                    pixelColor.a = alpha;

                }

                if (cloud.texture[x][y][z] < 0.8)
                    pixelColor.a = 0.5;

                if (cX * cX + cY * cY > max / 2)
                    pixelColor.a = 0.5;

                pixelColor.a = cloud.texture[x][y][z];

                if (cloud.transition && endFrame - cloud.transitionFrames <= animationFrame) {

                    let alpha = 0;

                    const alphaDecrease = 1 / cloud.transitionFrames;

                    const currentTransitionFrame = (endFrame - animationFrame - cloud.transitionFrames) * (-1);

                    alpha = 1 - (alphaDecrease * currentTransitionFrame);

                    if (alpha < pixelColor.a)
                        pixelColor.a = alpha;

                }

                const bgColor = hexToRGBA(buffer[(planetY + middleY) * width + (planetX + middleX)]);

                const blend = blendColors(cloud.blend, bgColor, pixelColor);

                const blendHex = Number(rgbToHex(blend));

                for (let px = planetX; px < posX + (x * weight) + weight - movement; px++)
                    for (let py = planetY; py < posY + (y * weight) + weight; py++) {
                        buffer[(py + middleY) * width + (px + middleX)] = blendHex;
                    }
            }
    })

}