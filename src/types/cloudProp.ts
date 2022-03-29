import { RGBColor } from "react-color";

export interface CloudsProps {
    clouds: CloudProps[]
}

export interface CloudProps {
    color: RGBColor,
    seed: string,
    id: string,
    maskRadius: number,
    pixelPositionX: number,
    pixelPositionY: number,
    depth: number, //length of the animation (depth of the 3D noise map calculated)
    startFrame: number,
    transition: boolean,
    looping: boolean,
    static: boolean,
    transitionFrames: number
} 