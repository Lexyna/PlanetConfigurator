import { point2d } from "../Logic/other/Point";

export interface PlanetTemplate {
    radius: number,
    shape: planetShape,
    noiseMap: number[][],
    texture: planetPixel[][]
}

export interface planetPixel {
    color: pixelColor
}

export interface planetShape {
    renderCircle: point2d[],
    pixelCircle: point2d[]
}

export interface pixelColor {
    rgb: rgb,
    hex: string //HexString are Alpha, Blue, Green, Red for ImageBuffer
    decimal: number //Decimal value of hex string for ImageBuffer
}

export interface rgb {
    r: number,
    g: number,
    b: number,
    a?: number
}