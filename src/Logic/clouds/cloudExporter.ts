import { RGBA } from "color-blend/dist/types";
import planet from "../planet/planet";
import { blendColors, hexToRGBA, rgbToHex } from "../utils/utils";
import { clouds } from "./cloud";

export const createCloudPng = (buffer: Uint32Array, animationFrame: number) => {

    const planetRadius: number = planet.radius;

    const imgSize = (planetRadius * 2) + 1;

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

        const cloudRadius = (cloud.maskRadius / 2);
        const max = cloudRadius * cloudRadius;

        const halfMaskRadius = cloudRadius;

        for (let x = 0; x < cloud.maskRadius; x++)
            for (let y = 0; y < cloud.maskRadius; y++) {

                const cX = x - halfMaskRadius;
                const cY = y - halfMaskRadius;

                const movement = (cloud.static) ? 0 : cloud.speed * z;

                const posX = cloud.pixelPositionX + planetRadius;
                const posY = cloud.pixelPositionY + planetRadius;

                const planetX = posX + x - movement;
                const planetY = posY + y;

                //Normal check for transparent black pixel alone won't work here, because the next pixel
                //after the edge of the image, is the first pixel in the next line
                if (planetX >= imgSize || planetX < 0)
                    continue;

                if (!buffer[(planetY) * imgSize + (planetX)])
                    continue;

                if (buffer[(planetY) * imgSize + (planetX)] === 0x00000000)
                    continue;

                if (cX * cX + cY * cY > max)
                    continue;

                if (cloud.texture[x][y][z] < 0.6)
                    continue;

                const maxAlpha = cloud.maxAlpha;

                const pixelColor: RGBA = {
                    r: cloud.color.r,
                    g: cloud.color.g,
                    b: cloud.color.b,
                    a: maxAlpha
                }

                //calculate clouds fade-in
                if (cloud.transition && startFrame + cloud.transitionFrames >= animationFrame) {

                    let alpha = 0;

                    const alphaIncrease = maxAlpha / cloud.transitionFrames;

                    const currentTransitionFrame = animationFrame - startFrame;

                    alpha = (alphaIncrease * currentTransitionFrame);

                    pixelColor.a = alpha;

                }

                //defined hard render value for the noise
                //if we're under it => adjust the alpha
                if (cloud.texture[x][y][z] < 0.8)
                    pixelColor.a = 0.5;

                //if we're near the edge of the maskRadius
                //adjust the alpha
                if (cX * cX + cY * cY > max / 2)
                    pixelColor.a = 0.5;

                //if specified, use the original noise value as alpha 
                if (cloud.usePreciseValues)
                    pixelColor.a = cloud.texture[x][y][z];

                //calculate clouds fade-out
                if (cloud.transition && endFrame - cloud.transitionFrames <= animationFrame) {

                    let alpha = 0;

                    const alphaDecrease = maxAlpha / cloud.transitionFrames;

                    const currentTransitionFrame = (endFrame - animationFrame - cloud.transitionFrames) * (-1);

                    alpha = 1 - (alphaDecrease * currentTransitionFrame);

                    //do not override old alpha values, if it is already less then fade-out alpha value
                    if (alpha < pixelColor.a)
                        pixelColor.a = (pixelColor.a - alpha < 0) ? 0 : alpha;
                }

                const backgroundColor = hexToRGBA(buffer[(planetY) * imgSize + (planetX)]);

                const blend = blendColors(cloud.blend, backgroundColor, pixelColor);

                const blendHex = Number(rgbToHex(blend));

                buffer[(planetY) * imgSize + (planetX)] = blendHex;

            }
    })

}