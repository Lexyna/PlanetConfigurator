import { store } from "../../store/store";
import { PixelMatrix } from "../../types/matrixType";
import { State } from "../../types/storeType";
import { updatePlanet } from "../planet/planet";
import pixelMatrix from "./matrix";

export const createPixelMatrix = (): PixelMatrix => {

    const state: State = store.getState();
    const pixelWeight = state.renderSettings.pixelSize;

    const countX = Math.round(window.innerWidth / pixelWeight);
    const countY = Math.round(window.innerHeight / pixelWeight);

    return {
        pixelWeight: pixelWeight,
        pixelCountX: countX,
        pixelCountY: countY,
        middleX: (Math.round(countX / 2) * pixelWeight) - pixelWeight,
        middleY: (Math.round(countY / 2) * pixelWeight) - pixelWeight,
    }

}

export const updatePixelMatrix = (): void => {

    const state: State = store.getState();
    const pixelWeight = state.renderSettings.pixelSize;

    const countX = Math.round(window.innerWidth / pixelWeight);
    const countY = Math.round(window.innerHeight / pixelWeight);

    pixelMatrix.pixelWeight = pixelWeight;
    pixelMatrix.pixelCountX = countX;
    pixelMatrix.pixelCountY = countY;
    pixelMatrix.middleX = (Math.round(countX / 2) * pixelWeight) - pixelWeight;
    pixelMatrix.middleY = (Math.round(countY / 2) * pixelWeight) - pixelWeight;
    updatePlanet();
}