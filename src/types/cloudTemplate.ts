import { RGBColor } from "react-color"

export interface CloudTemplate {
    texture: number[][][],
    color: RGBColor,
    seed: string,
    id: string,
    maskRadius: number,
    pixelPositionX: number,
    pixelPositionY: number,
    positionX: number,
    positionY: number
    depth: number,
    startFrame: number,
    transition: boolean,
    static: boolean,
    transitionFrames: number
} 