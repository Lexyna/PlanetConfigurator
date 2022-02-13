import { point2d } from "../Logic/other/Point";

export interface PlanetTemplate {
    shape: point2d[],
    noiseMap: number[][],
    texture: planetPixel[]
}

export interface planetPixel {
    coordinate: point2d,
    color: rgb
}

export interface rgb {
    r: number,
    g: number,
    b: number
}