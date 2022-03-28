import { nanoid } from "nanoid";
import { stat } from "node:fs";
import { text } from "node:stream/consumers";
import { RGBColor } from "react-color";
import { store } from "../../store/store";
import { CloudProps, CloudsProps } from "../../types/cloudProp";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import planet from "../planet/planet";
import { randomRange } from "../Random/randomUtils";
import { create3DSimplexNoiseMap } from "../Random/simplexNoise";
import { Animator } from "../renderer/Animator";
import { cerateRGBColor, rgbToHex } from "../utils/utils";

export const clouds: CloudsProps = {
    clouds: []
};

export const updateClouds = () => {
    const state: State = store.getState();

    clouds.clouds = state.cloudSettings.clouds;
}

export const createCloud = (): CloudProps => {

    const seed = nanoid();

    const radius = planet.radius;
    const depth = planet.noiseMap.length;

    const maskRadius = 10;

    const weight = pixelMatrix.pixelWeight;

    const posX = -weight + randomRange(-radius, radius) * weight;
    const posY = -weight + randomRange(-radius, radius) * weight;

    return {
        texture: create3DSimplexNoiseMap(seed, maskRadius, maskRadius, depth),
        seed: seed,
        color: cerateRGBColor(255, 255, 255, 255),
        id: nanoid(),
        maskRadius: maskRadius,
        depth: depth,
        startFrame: Animator.getAnimationFrame(),
        transition: false,
        static: true,
        transitionFrames: 0,
        positionX: posX,
        positionY: posY
    }
}

export const renderClouds = (buffer: Uint32Array, width: number, animationFrame: number) => {

    const middleX = pixelMatrix.middleX;
    const middleY = pixelMatrix.middleY;

    const weight = pixelMatrix.pixelWeight;

    clouds.clouds.forEach(cloud => {

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

        const radius = cloud.maskRadius;
        const max = radius * radius;

        const halfMaskRadius = cloud.maskRadius / 2;

        for (let x = 0; x < cloud.maskRadius; x++)
            for (let y = 0; y < cloud.maskRadius; y++) {

                const cX = x - halfMaskRadius;
                const cY = y - halfMaskRadius;

                const movement = (cloud.static) ? 0 : z;

                const planetX = cloud.positionX + (x * weight) - movement;
                const planetY = cloud.positionY + (y * weight);

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

                for (let px = planetX; px < cloud.positionX + (x * weight) + weight - movement; px++)
                    for (let py = planetY; py < cloud.positionY + (y * weight) + weight; py++) {
                        buffer[(py + middleY) * width + (px + middleX)] = pixelColor;
                    }
            }
    })

}