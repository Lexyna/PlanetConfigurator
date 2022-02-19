import { point2d } from "../other/Point";
import { getCanvas } from "../renderer/Renderer";
import { rgbToHex } from "../utils/utils";
import planet from "./planet";
import { calculatePixelColor } from "./planetUtils";

export const createPlanetPNG = (buffer: Uint32Array, animationFrame: number) => {

    const radius: number = planet.radius;

    const imgSize = radius * 2;

    const canvas = getCanvas("downloadCanvas") as HTMLCanvasElement;
    canvas.width = imgSize;
    canvas.height = imgSize;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const planetImg: ImageData = ctx.createImageData(imgSize, imgSize);
    const imgBuffer: Uint32Array = new Uint32Array(planetImg.data.buffer);

    planet.shape.pixelCircle.forEach((pixel: point2d, index: number) => {

        const imgIndexX = pixel.x + radius;
        const imgIndexY = pixel.y + radius;

        let indexX = pixel.x + animationFrame;
        let indexY = pixel.y + radius;

        if (indexX < 0)
            indexX = planet.noiseMap.length + indexX;
        else if (indexX >= planet.texture.length)
            indexX -= planet.noiseMap.length;

        const colorValue = planet.noiseMap[indexX][indexY];

        const rgbColor = calculatePixelColor(colorValue, planet.colorMappings);

        const pixelColor = Number(rgbToHex(rgbColor));

        buffer[(imgIndexY * imgSize) + imgIndexX] = pixelColor;

    });
}