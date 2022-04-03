import { RGBA } from "color-blend/dist/types";
import { radiusSelector, seedSelector } from "../../store/selectors/planetSelector";
import { store } from "../../store/store";
import { ColorMapping } from "../../types/planetProp";
import { planetShape, PlanetTemplate } from "../../types/planetTemplate";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { generatePerlinNoise } from "../Random/perlinNoise";
import { generateWhiteNoiseWithSeed } from "../Random/seededNoise";
import { create3DPlanetMap } from "../Random/simplexNoise";
import { Circles } from "../utils/Circles";


export const creatNewPlanet = (): PlanetTemplate => {
    const noise = createNoiseMap();
    return {
        radius: getPlanetRadius(),
        shape: getPlanetShape(),
        noiseMap: noise,
        colorMappings: getPlanetColorMapping(),
    }
}

export const getPlanetRadius = () => {
    const state: State = store.getState();
    return state.planet.radius;
}

export const getPlanetColorMapping = () => {
    const state: State = store.getState();
    return state.planet.colorMapping;
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

export const createNoiseMap = () => {

    /**
     * TODO: Implement different values for width (2^n)
     */

    const state: State = store.getState();

    const seed = seedSelector(state);
    const whiteNoise = generateWhiteNoiseWithSeed(seed, 256, 256);

    return generatePerlinNoise(whiteNoise, 6);
}

export const createAnimatedNoiseMap = () => {

    const state: State = store.getState();

    const seed = seedSelector(state);
    const radius = radiusSelector(state);

    return create3DPlanetMap(seed, 256, 129, 256);

}

export const calculatePixelColor = (value: number, colorMappings: ColorMapping[]): RGBA => {

    const pixelColor: RGBA = {
        r: Math.floor(255 * value),
        g: Math.floor(255 * value),
        b: Math.floor(255 * value),
        a: 1
    }

    let min = 1;

    colorMappings.forEach((mapping => {

        if (value <= mapping.value && mapping.value <= min) {

            min = mapping.value;

            pixelColor.r = Math.floor(mapping.color.r);
            pixelColor.b = Math.floor(mapping.color.b);
            pixelColor.g = Math.floor(mapping.color.g);
            pixelColor.a = mapping.color.a;
        }
    }))


    return pixelColor;
}