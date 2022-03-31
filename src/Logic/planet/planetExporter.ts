import { point2d } from "../other/Point";
import { rgbToHex } from "../utils/utils";
import planet from "./planet";
import { calculatePixelColor } from "./planetUtils";

export const createPlanetPNG = (buffer: Uint32Array, animationFrame: number) => {

    const radius: number = planet.radius;

    const imgSize = (radius * 2) + 1;

    planet.shape.pixelCircle.forEach((pixel: point2d, index: number) => {

        const imgIndexX = pixel.x + radius;
        const imgIndexY = pixel.y + radius;

        let indexX = pixel.x + animationFrame;
        let indexY = pixel.y + radius;

        if (indexX < 0)
            indexX = planet.noiseMap.length + indexX;
        else if (indexX >= planet.noiseMap.length)
            indexX -= planet.noiseMap.length;

        const colorValue = planet.noiseMap[indexX][indexY];

        const rgbColor = calculatePixelColor(colorValue, planet.colorMappings);

        const pixelColor = Number(rgbToHex(rgbColor));

        buffer[(imgIndexY * imgSize) + imgIndexX] = pixelColor;

    });
}