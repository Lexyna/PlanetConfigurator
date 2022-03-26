import { RGBColor } from "react-color";

export interface CloudsProps {
    clouds: CloudProps[]
}

export interface CloudProps {
    texture: number[][][],
    color: RGBColor,
    seed: string,
    id: string,
    positionX: number,
    positionY: number
    width: number,
    height: number,
    depth: number,
    startFrame: number,
    transition: boolean,
    transitionFrames: number
}