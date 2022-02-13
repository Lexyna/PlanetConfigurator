import { planetPixel, PlanetTemplate } from "../../types/planetTemplate";
import { creatNewPlanet } from "./planetUtils";

const planet: PlanetTemplate = creatNewPlanet();

export const renderPlanet = (ctx: CanvasRenderingContext2D) => {

    const middle = 500;

    planet.texture.forEach((pixel: planetPixel) => {



        ctx.fillStyle = "#ffffff";

        ctx.fillRect(pixel.coordinate.x + middle, pixel.coordinate.y + middle, 1, 1);

    })
}

export default planet;