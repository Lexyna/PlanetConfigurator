import { RGBColor } from "react-color";
import { store } from "../../store/store";
import { PlanetTemplate, rgb } from "../../types/planetTemplate";
import { State } from "../../types/storeType";
import { clouds } from "../clouds/cloud";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { addRGBColors, hexToRgb, rgbToHex } from "../utils/utils";
import { calculatePixelColor, createNoiseMap, creatNewPlanet, getPlanetColorMapping, getPlanetRadius, getPlanetShape } from "./planetUtils";

const planet: PlanetTemplate = creatNewPlanet();

export const updatePlanet = () => {

    const radius = getPlanetRadius();
    const shape = getPlanetShape();

    planet.radius = radius;
    planet.shape = shape;

}

export const updateNoiseMap = () => {
    planet.noiseMap = createNoiseMap();
    updatePlanetColorMapping();
}

export const updatePlanetColorMapping = () => {
    planet.colorMappings = getPlanetColorMapping();
}

export const renderPlanet = (buffer: Uint32Array, width: number, height: number, animationFrame: number) => {

    const middleX = pixelMatrix.middleX;
    const middleY = pixelMatrix.middleY;

    const weight = pixelMatrix.pixelWeight;

    planet.shape.renderCircle.forEach((pixel: point2d, index: number) => {

        const pixelPoint: point2d = planet.shape.pixelCircle[index];

        //Texture index
        let indexX = pixelPoint.x + animationFrame;
        let indexY = (pixelPoint.y) + planet.radius;

        if (indexX < 0)
            indexX = planet.noiseMap.length + indexX;
        else if (indexX >= planet.noiseMap.length)
            indexX -= planet.noiseMap.length;

        const colorValue = planet.noiseMap[indexX][indexY];

        const rgbColor = calculatePixelColor(colorValue, planet.colorMappings);

        const pixelColor = Number(rgbToHex(rgbColor));

        //create a whole pixel
        for (let x = pixel.x; x < pixel.x + weight; x++)
            for (let y = pixel.y; y < pixel.y + weight; y++)
                buffer[(y + middleY) * width + (x + middleX)] = pixelColor;
    });

    //compute Clouds
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

                const planetX = cloud.positionX + (x * weight) - z;
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

                for (let px = planetX; px < cloud.positionX + (x * weight) + weight - z; px++)
                    for (let py = planetY; py < cloud.positionY + (y * weight) + weight; py++) {
                        buffer[(py + middleY) * width + (px + middleX)] = pixelColor;
                    }

            }

    })

}

export default planet;