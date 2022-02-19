import { PixelMatrix } from "../../types/matrixType";
import { createPixelMatrix, updatePixelMatrix } from "./matrixUtils";

/**
 * Holds information about how many pixels should be displayed in the scene
 * Used to apply scaling transformation for the render method
 */
const pixelMatrix: PixelMatrix = createPixelMatrix();

window.addEventListener("resize", updatePixelMatrix)

export default pixelMatrix;