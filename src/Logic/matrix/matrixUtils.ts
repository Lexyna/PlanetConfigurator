import { PixelMatrix } from "../../types/matrixType";

export const updatePixelMatrix = (): PixelMatrix => {

    const pixelWeigh = 10;

    const countX = Math.round(window.innerWidth / pixelWeigh);
    const countY = Math.round(window.innerHeight / pixelWeigh);

    return {
        pixelWeight: pixelWeigh,
        pixelCountX: countX,
        pixelCountY: countY,
        middleX: (Math.round(countX / 2) * pixelWeigh) - pixelWeigh,
        middleY: (Math.round(countY / 2) * pixelWeigh) - pixelWeigh,
    }
}