import { RGBColor } from "react-color"

export interface CloudTemplate {
    texture: number[][][],
    color: RGBColor,
    seed: string,
    id: string,
    maskRadius: number,
    pixelPositionX: number,
    pixelPositionY: number,
    depth: number,
    startFrame: number,
    looping: boolean,
    transition: boolean,
    static: boolean,
    transitionFrames: number
} 