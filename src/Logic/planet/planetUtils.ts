import { store } from "../../store/store";
import { planetPixel, planetShape, PlanetTemplate, rgb } from "../../types/planetTemplate";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { generatePerlinNoise } from "../Random/perlinNoise";
import { generateWhiteNoiseWithSeed } from "../Random/seededNoise";
import { Circles } from "../utils/Circles";
import { cerateRGBColor, rgbToHex } from "../utils/utils";


export const creatNewPlanet = (): PlanetTemplate => {
    const noise = createNoiseMap();
    return {
        radius: getPlanetRadius(),
        shape: getPlanetShape(),
        noiseMap: noise,
        texture: createTexture(noise)
    }
}

export const getPlanetRadius = () => {
    const state: State = store.getState();
    return state.planet.radius;
}

export const getPlanetShape = (): planetShape => {

    const state: State = store.getState();
    const radius = state.planet.radius;

    const points = Circles.getCircle(radius);
    const shape: point2d[] = [];

    const weight = pixelMatrix.pixelWeight;

    points.forEach((point: point2d) => {
        shape.push({ x: (-weight + point.x * weight), y: (-weight + point.y * weight) })
    })

    const planetShape: planetShape = {
        renderCircle: shape,
        pixelCircle: points
    }

    return planetShape;
}

export const createTexture = (noiseMap: number[][]): planetPixel[][] => {

    const texture: planetPixel[][] = [];

    for (var i = 0; i < noiseMap.length; i++)
        texture[i] = [];

    for (var i = 0; i < noiseMap.length; i++)
        for (var j = 0; j < noiseMap[0].length; j++) {

            const value = noiseMap[i][j];

            const color: rgb = cerateRGBColor(
                Math.floor(255 * value),
                Math.floor(255 * value),
                Math.floor(255 * value),
                255);

            const hexString = rgbToHex(color)

            texture[i][j] = {
                color: {
                    rgb: color,
                    hex: hexString,
                    decimal: Number(hexString)
                }
            }
        }
    return texture;
}

export const createNoiseMap = () => {

    /**
     * TODO: Implement different values for width (2^n)
     */

    const seed = "TempSeed"
    const whiteNoise = generateWhiteNoiseWithSeed(seed, 256, 256);

    return generatePerlinNoise(whiteNoise, 6);
}