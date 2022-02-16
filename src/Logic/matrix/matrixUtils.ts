import { PixelMatrix } from "../../types/matrixType";
import pixelMatrix from "./matrix";

export const createPixelMatrix = (): PixelMatrix => {

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

export const updatePixelMatrix = (): void => {

    const pixelWeigh = 10;

    const countX = Math.round(window.innerWidth / pixelWeigh);
    const countY = Math.round(window.innerHeight / pixelWeigh);

    pixelMatrix.pixelWeight = pixelWeigh;
    pixelMatrix.pixelCountX = countX;
    pixelMatrix.pixelCountY = countY;
    pixelMatrix.middleX = (Math.round(countX / 2) * pixelWeigh) - pixelWeigh;
    pixelMatrix.middleY = (Math.round(countY / 2) * pixelWeigh) - pixelWeigh;
}