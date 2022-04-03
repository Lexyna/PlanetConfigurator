import { RGBA } from "color-blend/dist/types";

export interface PlanetProps {
    radius: number;
    seed: string,
    animatedTerrain: boolean,
    colorMapping: ColorMapping[]
}

export interface ColorMapping {
    id: string,
    value: number,
    color: RGBA
}