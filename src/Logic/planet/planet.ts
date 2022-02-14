import { PlanetTemplate } from "../../types/planetTemplate";
import pixelMatrix from "../matrix/matrix";
import { point2d } from "../other/Point";
import { createTexture, creatNewPlanet, getPlanetRadius, getPlanetShape } from "./planetUtils";

const planet: PlanetTemplate = creatNewPlanet();

export const updatePlanet = () => {

    const shape = getPlanetShape();
    const texture = createTexture(planet.noiseMap);

    planet.radius = getPlanetRadius();
    planet.shape = shape;
    planet.texture = texture;

}

export const renderPlanet = (ctx: CanvasRenderingContext2D) => {

    const middleX = pixelMatrix.middleX;
    const middleY = pixelMatrix.middleY;

    const weight = pixelMatrix.pixelWeight;

    const frameIndex = 0;

    planet.shape.renderCircle.forEach((pixel: point2d, index: number) => {

        const pixelPoint: point2d = planet.shape.pixelCircle[index];

        let indexX = 0;
        let indexY = pixelPoint.y + planet.radius;

        if (pixelPoint.x < 0)
            indexX = planet.texture.length + pixelPoint.x;
        else
            indexX = frameIndex + pixelPoint.x;

        const color = planet.texture[indexX][indexY];

        ctx.fillStyle = `rgb(${color.color.r}, ${color.color.r}, ${color.color.r})`;

        ctx.fillRect(pixel.x + middleX, pixel.y + middleY, weight, weight);

    })
}

export default planet;