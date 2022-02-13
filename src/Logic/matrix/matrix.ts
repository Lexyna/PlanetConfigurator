import { PixelMatrix } from "../../types/matrixType";
import { createPixelMatrix, updatePixelMatrix } from "./matrixUtils";

const pixelMatrix: PixelMatrix = createPixelMatrix();

window.addEventListener("resize", updatePixelMatrix)

export default pixelMatrix;