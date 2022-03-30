import { RGBColor } from "react-color";

export interface CloudsProps {
    clouds: CloudProps[]
}

export interface CloudProps {
    color: RGBColor,
    blend: Blend,
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

export enum Blend {
    NORMAL = "NORMAL",
    MULTIPLY = "MULTIPLY",
    SCREEN = "SCREEN",
    OVERLAY = "OVERLAY",
    DARKEN = "DARKEN",
    LIGHTEN = "LIGHTEN",
    COLORDODGE = "COLORDODGE",
    COLORBURN = "COLORBURN",
    HARDLIGHT = "HARDLIGHT",
    SOFTLIGHT = "SOFTLIGHT",
    DIFFERENCE = "DIFFERENCE",
    EXCLUSION = "EXCLUSION",
    HUE = "HUE",
    SATURATION = "SATURATION",
    COLOR = "COLOR",
    LUMINOSITY = "LUMINOSITY"
}