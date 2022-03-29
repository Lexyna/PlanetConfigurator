import { nanoid } from "nanoid";
import { stat } from "node:fs";
import { text } from "node:stream/consumers";
import { RGBColor } from "react-color";
import { useDispatch } from "react-redux";
import { majorCloudsChange } from "../../store/observers/observerUtils";
import { store } from "../../store/store";
import { CloudProps, CloudsProps } from "../../types/cloudProp";
import { CloudTemplate } from "../../types/cloudTemplate";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import planet from "../planet/planet";
import { randomRange } from "../Random/randomUtils";
import { create3DSimplexNoiseMap, createLooping3DSimplexNoiseMap } from "../Random/simplexNoise";
import { Animator } from "../renderer/Animator";
import { cerateRGBColor, rgbToHex } from "../utils/utils";
import { addCloud, convertClouds, removeCloud, updateCloudAt } from "./cloudUtils";

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
                    clouds[j].texture = createLooping3DSimplexNoiseMap(clouds[i].seed, clouds[i].maskRadius, clouds[i].maskRadius, clouds[i].depth)//create3DSimplexNoiseMap(clouds[i].seed, clouds[i].maskRadius, clouds[i].maskRadius, clouds[i].depth)
                }
        }
    }

}

export const createCloud = (): CloudProps => {

    const seed = nanoid();

    const radius = planet.radius - 2;
    const depth = planet.noiseMap.length;

    const maskRadius = 20;

    const weight = pixelMatrix.pixelWeight;

    const pixelPositionX = randomRange(-radius, radius);
    const pixelPositionY = randomRange(-radius * 2, radius);

    return {
        seed: seed,
        color: cerateRGBColor(255, 255, 255, 255),
        id: nanoid(),
        maskRadius: maskRadius,
        depth: depth,
        startFrame: Animator.getAnimationFrame(),
        transition: false,
        static: false,
        transitionFrames: 0,
        pixelPositionX: pixelPositionX,
        pixelPositionY: pixelPositionY
    }
}

export const renderClouds = (buffer: Uint32Array, width: number, animationFrame: number) => {

    //TODO: CLOUDS NOT WENDERING WHEN pixel wieght not 5

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

                const val = cloud.texture[x][y][z];

                const rgb: RGBColor = {
                    r: cloud.color.r,
                    g: cloud.color.g,
                    b: cloud.color.b,
                    a: Math.floor(255)
                }

                if (cloud.texture[x][y][z] < 0.8)
                    rgb.a = 230;

                if (cX * cX + cY * cY > max / 2)
                    rgb.a = 230;

                const pixelColor = Number(rgbToHex(rgb));

                for (let px = planetX; px < posX + (x * weight) + weight - movement; px++)
                    for (let py = planetY; py < posY + (y * weight) + weight; py++) {
                        buffer[(py + middleY) * width + (px + middleX)] = pixelColor;
                    }
            }
    })

}