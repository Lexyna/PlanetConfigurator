import { point2d } from "../Logic/other/Point";

export interface PlanetTemplate {
    radius: number,
    shape: planetShape,
    noiseMap: number[][],
    texture: planetPixel[][]
}

export interface planetPixel {
    color: rgb
}

export interface planetShape {
    renderCircle: point2d[],
    pixelCircle: point2d[]
}

export interface rgb {
    r: number,
    g: number,
    b: number
}