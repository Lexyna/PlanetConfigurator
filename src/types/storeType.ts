import { PlanetProps } from "./planetProp";

export interface State {
    planet: PlanetProps
    renderSettings: RenderProps
}

export interface RenderProps {
    animate: boolean;
    fps: number
    pixelSize: number,
    keyframe: number
}