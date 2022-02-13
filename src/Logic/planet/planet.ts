import { PlanetTemplate } from "../../types/planetTemplate";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { creatNewPlanet } from "./planetUtils";

const planet: PlanetTemplate = creatNewPlanet();

export const renderPlanet = (ctx: CanvasRenderingContext2D) => {

    const middleX = (Math.round(pixelMatrix.pixelCountX / 2) * pixelMatrix.pixelWeight) - pixelMatrix.pixelWeight;
    const middleY = (Math.round(pixelMatrix.pixelCountY / 2) * pixelMatrix.pixelWeight) - pixelMatrix.pixelWeight;

    const weight = pixelMatrix.pixelWeight;

    planet.shape.forEach((pixel: point2d) => {

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(pixel.x + middleX, pixel.y + middleY, weight, weight);

    })
}

export default planet;