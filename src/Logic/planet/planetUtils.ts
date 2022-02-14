import { store } from "../../store/store";
import { planetPixel, planetShape, PlanetTemplate } from "../../types/planetTemplate";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { generatePerlinNoise } from "../Random/perlinNoise";
import { generateWhiteNoiseWithSeed } from "../Random/seededNoise";
import { Circles } from "../utils/Circles";


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
            texture[i][j] = {
                color: { r: 255 * value, g: 255 * value, b: 255 * value }
            }
        }

    return texture;
}

export const createNoiseMap = () => {

    const state: State = store.getState();
    const radius = state.planet.radius;

    //calculate next power of two
    let width = 2 * Math.PI * radius;
    width = Math.round(width);
    width = 1 << 32 - Math.clz32(width);

    const seed = "TempSeed"
    const whiteNoise = generateWhiteNoiseWithSeed(seed, width, width);

    return generatePerlinNoise(whiteNoise, 7);
}