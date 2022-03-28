import { RGBColor } from "react-color";

export interface CloudsProps {
    clouds: CloudProps[]
}

export interface CloudProps {
    texture: number[][][],
    color: RGBColor,
    seed: string,
    id: string,
    maskRadius: number,
    positionX: number,
    positionY: number
    depth: number,
    startFrame: number,
    transition: boolean,
    static: boolean,
    transitionFrames: number
} 