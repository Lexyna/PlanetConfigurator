import { PixelMatrix } from "../../types/matrixType";

export const updatePixelMatrix = (): PixelMatrix => {

    const pixelWeigh = 10;

    return {
        pixelWeight: pixelWeigh,
        pixelCountX: Math.round(document.body.clientWidth / pixelWeigh),
        pixelCountY: Math.round(document.body.clientHeight / pixelWeigh)
    }
}