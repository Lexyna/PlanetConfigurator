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

export const renderPlanet = (ctx: CanvasRenderingContext2D, buffer: Uint32Array, width: number, height: number) => {

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
        else indexX = frameIndex + pixelPoint.x;

        const pixelColor = planet.texture[indexX][indexY].color.decimal;

        //create a whole pixel
        for (let x = pixel.x; x < pixel.x + weight; x++)
            for (let y = pixel.y; y < pixel.y + weight; y++)
                buffer[(y + middleY) * width + (x + middleX)] = pixelColor;
    });
}

export default planet;