import { CloudsProps } from "./cloudProp";
import { PlanetProps } from "./planetProp";

export interface State {
    planet: PlanetProps
    renderSettings: RenderProps
    cloudSettings: CloudsProps
}

export interface RenderProps {
    animate: boolean;
    fps: number
    pixelSize: number,
    keyframe: number
}