import { PlanetTemplate } from "../../types/planetTemplate";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { rgbToHex } from "../utils/utils";
import { calculatePixelColor, createNoiseMap, createTexture, creatNewPlanet, getPlanetColorMapping, getPlanetRadius, getPlanetShape } from "./planetUtils";

const planet: PlanetTemplate = creatNewPlanet();

export const updatePlanet = () => {

    const radius = getPlanetRadius();
    const shape = getPlanetShape();

    planet.radius = radius;
    planet.shape = shape;

}

export const updatePlanetTexture = () => {
    planet.texture = createTexture(planet.noiseMap);
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
        else if (indexX >= planet.texture.length)
            indexX -= planet.noiseMap.length;

        const colorValue = planet.noiseMap[indexX][indexY];

        const rgbColor = calculatePixelColor(colorValue, planet.colorMappings);

        const pixelColor = Number(rgbToHex(rgbColor));


        //create a whole pixel
        for (let x = pixel.x; x < pixel.x + weight; x++)
            for (let y = pixel.y; y < pixel.y + weight; y++)
                buffer[(y + middleY) * width + (x + middleX)] = pixelColor;
    });
}

export default planet;