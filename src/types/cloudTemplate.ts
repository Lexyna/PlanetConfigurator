import { RGBColor } from "react-color"
import { Blend } from "./cloudProp"

export interface CloudTemplate {
    texture: number[][][],
    color: RGBColor,
    blend: Blend,
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
    usePreciseValues: boolean,
    transitionFrames: number
} 