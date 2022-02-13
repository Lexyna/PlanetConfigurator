import { PlanetTemplate } from "../../types/planetTemplate";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { createTexture, creatNewPlanet, getPlanetShape } from "./planetUtils";

const planet: PlanetTemplate = creatNewPlanet();

export const updatePlanet = () => {

    const shape = getPlanetShape();
    const texture = createTexture();

    planet.shape = shape;
    planet.texture = texture;

}

export const renderPlanet = (ctx: CanvasRenderingContext2D) => {

    const middleX = pixelMatrix.middleX;
    const middleY = pixelMatrix.middleY;

    const weight = pixelMatrix.pixelWeight;

    planet.shape.forEach((pixel: point2d) => {

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(pixel.x + middleX, pixel.y + middleY, weight, weight);

    })
}

export default planet;