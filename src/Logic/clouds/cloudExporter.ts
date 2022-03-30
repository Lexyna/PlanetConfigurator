import { RGBColor } from "react-color";
import planet from "../planet/planet";
import { rgbToHex } from "../utils/utils";
import { clouds } from "./cloud";

export const createCloudPng = (buffer: Uint32Array, animationFrame: number) => {

    const planetRadius: number = planet.radius;

    const imgSize = planetRadius * 2;

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

                const movement = (cloud.static) ? 0 : z;

                const posX = cloud.pixelPositionX + planetRadius;
                const posY = cloud.pixelPositionY + planetRadius;

                const planetX = posX + x - movement;
                const planetY = posY + y;

                //Normal check for transparent black pixel alone won't work here, because the next pixel
                //after the edge of the image, is the first pixel in the next line
                if (planetX >= imgSize || planetX < 0)
                    continue;

                if (buffer[(planetY) * imgSize + (planetX)] === 0x00000000)
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

                buffer[(planetY) * imgSize + (planetX)] = pixelColor;

            }
    })

}