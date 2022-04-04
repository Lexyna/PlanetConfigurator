import { store } from "../../store/store";
import { PlanetTemplate } from "../../types/planetTemplate";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { rgbToHex } from "../utils/utils";
import { calculatePixelColor, createAnimatedNoiseMap, createNoiseMap, creatNewPlanet, getPlanetColorMapping, getPlanetRadius, getPlanetShape } from "./planetUtils";

const planet: PlanetTemplate = creatNewPlanet();

export const updatePlanet = () => {

    const radius = getPlanetRadius();
    const shape = getPlanetShape();

    planet.radius = radius;
    planet.shape = shape;

}

export const updateNoiseMap = () => {
    const state: State = store.getState();

    if (!state.planet.animatedTerrain)
        planet.noiseMap = createNoiseMap();
    else
        planet.noiseMap = createAnimatedNoiseMap();

    updatePlanetColorMapping();
}

export const updatePlanetColorMapping = () => {
    planet.colorMappings = getPlanetColorMapping();
}

export const renderPlanet = (buffer: Uint32Array, width: number, height: number, animationFrame: number) => {

    const state: State = store.getState();

    if (!state.planet.animatedTerrain)
        renderPlanet2D(buffer, width, height, animationFrame);
    else
        renderPlanet3D(buffer, width, height, animationFrame);

}

export const renderPlanet2D = (buffer: Uint32Array, width: number, height: number, animationFrame: number) => {

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

        const colorValue = planet.noiseMap[indexX][indexY] as number;


        const rgbColor = calculatePixelColor(colorValue, planet.colorMappings);

        const pixelColor = Number(rgbToHex(rgbColor));

        //create a whole pixel
        for (let x = pixel.x; x < pixel.x + weight; x++)
            for (let y = pixel.y; y < pixel.y + weight; y++)
                buffer[(y + middleY) * width + (x + middleX)] = pixelColor;
    });

}

export const renderPlanet3D = (buffer: Uint32Array, width: number, height: number, animationFrame: number) => {

    const middleX = pixelMatrix.middleX;
    const middleY = pixelMatrix.middleY;

    const weight = pixelMatrix.pixelWeight;
    const noiseMap = planet.noiseMap as number[][][];

    planet.shape.renderCircle.forEach((pixel: point2d, index: number) => {

        const pixelPoint: point2d = planet.shape.pixelCircle[index];

        const colorValue: number = noiseMap[animationFrame][pixelPoint.x + planet.radius][pixelPoint.y + planet.radius];

        const rgbColor = calculatePixelColor(colorValue, planet.colorMappings);

        //rgbColor.a = colorValue;


        const pixelColor = Number(rgbToHex(rgbColor));

        //create a whole pixel
        for (let x = pixel.x; x < pixel.x + weight; x++)
            for (let y = pixel.y; y < pixel.y + weight; y++)
                buffer[(y + middleY) * width + (x + middleX)] = pixelColor;
    });

}

export default planet;