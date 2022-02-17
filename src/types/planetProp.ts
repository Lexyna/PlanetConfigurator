import { RGBColor } from "react-color";

export interface PlanetProps {
    radius: number;
    colorMapping: ColorMapping[]
}

export interface ColorMapping {
    id: string,
    value: number,
    color: RGBColor
}