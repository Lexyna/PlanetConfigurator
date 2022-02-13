import { store } from "../../store/store";
import { State } from "../../types/storeType";
import { point2d } from "../other/Point";
import { planetPixel, PlanetTemplate } from "../other/types/planetTemplate";
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

    return Circles.getCircle(radius);
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