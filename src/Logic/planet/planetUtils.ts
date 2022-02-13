import { store } from "../../store/store";
import { planetPixel, PlanetTemplate } from "../../types/planetTemplate";
import { State } from "../../types/storeType";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { Circles } from "../utils/Circles";
import { cerateColor } from "../utils/utils";


export const creatNewPlanet = (): PlanetTemplate => {
    return {
        shape: getPlanetShape(),
        noiseMap: [],
        texture: createTexture()
    }
}

export const getPlanetShape = (): point2d[] => {

    const state: State = store.getState();
    const radius = state.planet.radius;

    const points = Circles.getCircle(radius);
    const shape: point2d[] = [];

    const weight = pixelMatrix.pixelWeight;

    points.forEach((point: point2d) => {
        shape.push({ x: (-weight + point.x * weight), y: (-weight + point.y * weight) })
    })

    return shape;
}

export const createTexture = (): planetPixel[] => {

    const state: State = store.getState();

    const radius = state.planet.radius;

    const points = Circles.getCircle(radius);

    const texture: planetPixel[] = [];

    points.forEach((p: point2d) => {
        const pixel: planetPixel = {
            coordinate: p,
            color: cerateColor(255, 255, 255),
        }
        texture.push(pixel);
    })

    return texture;
}
