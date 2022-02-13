import { PixelMatrix } from "../../types/matrixType";

export const updatePixelMatrix = (): PixelMatrix => {

    const pixelWeigh = 10;

    return {
        pixelWeight: pixelWeigh,
        pixelCountX: Math.round(window.innerWidth / pixelWeigh),
        pixelCountY: Math.round(window.innerHeight / pixelWeigh)
    }
}