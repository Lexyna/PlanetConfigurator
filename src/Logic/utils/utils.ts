import { color, colorBurn, colorDodge, darken, difference, exclusion, hardLight, hue, lighten, luminosity, multiply, normal, overlay, saturation, screen, softLight } from "color-blend";
import { RGBA } from "color-blend/dist/types";
import { RGBColor } from "react-color";
import { Blend } from "../../types/cloudProp";
import { rgb } from "../../types/planetTemplate";
import { solveQuadratic } from "../Math/utils";
import { addVec3, multiplyScalar, subVec3, Vector3 } from "../Math/vectorUtils";
import { point2d, pointToSphereCoordinate } from "../other/Point";

export const circleGenerator = (radius: number): point2d[] => {

    if (radius > 64)
        return [];

    //Bresenham’s circle drawing algorithm

    let d = 3 - (2 * radius);
    let x = 0;
    let y = radius;

    const circle: point2d[] = [];

    do {

        const points: point2d[] = [];

        points.push({ x: + x, y: + y })
        points.push({ x: + x, y: - y })
        points.push({ x: - x, y: + y })
        points.push({ x: - x, y: - y })
        points.push({ x: + y, y: + x })
        points.push({ x: + y, y: - x })
        points.push({ x: - y, y: + x })
        points.push({ x: - y, y: - x })

        points.forEach((point: point2d) => {
            if (!circle.some((p: point2d) => p.x === point.x && p.y === point.y))
                circle.push(point);
        })

        if (d < 0) {
            d = d + (4 * x) + 6
        } else {
            d = d + 4 * (x - y) + 10;
            y--;
        }

        x++;

    } while (x <= y)

    //Populate inside of circle
    const max = radius * radius;

    for (var i = -radius; i < radius; i++)
        for (var j = -radius; j < radius; j++)
            if (i * i + j * j < max)
                circle.push({ x: i, y: j });

    return circle;
}

export const sphereGenerator = (radius: number): pointToSphereCoordinate => {

    const coordinates: pointToSphereCoordinate = {};

    //Constant "origin position"
    //Try different fov// 100 is good

    let fov;
    let zOffset;

    //create a function with predefined fov and Z offsets
    if (radius >= 50) {
        fov = 2 * radius;
        zOffset = -2 * radius;
    } else {
        fov = radius + 60;
        zOffset = -(radius + 45);
    }
    fov = 60;
    //const fov = 40;
    const origin: Vector3 = new Vector3(0, 0, -60);//-80
    const center: Vector3 = new Vector3(0, 0, 0);

    for (let x = -radius; x < radius + 0; x++)
        for (let y = -radius; y < radius + 0; y++) {

            //calculate Sphere based on line-sphere-intersection
            //https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection
            let t0: number, t1: number;

            //z = fov
            const direction: Vector3 = new Vector3(x, y, fov);

            const L: Vector3 = subVec3(origin, center);

            const a: number = direction.dot(direction);
            const b: number = 2 * direction.dot(L);
            const c: number = L.dot(L) - (radius * radius);

            [t0, t1] = solveQuadratic(a, b, c);

            if (isNaN(t0)) {
                const key: string = x + "," + y;
                coordinates[key] = new Vector3(NaN, NaN, NaN);
                continue;
            }

            //use t0 to calculate 
            const hit: Vector3 = addVec3(origin, multiplyScalar(direction, t0));
            const key: string = x + "," + y;
            coordinates[key] = hit;

        }
    return coordinates;
}


export const cerateRGBColor = (r: number, g: number, b: number, alpha?: number): RGBA => {

    const a = (alpha) ? alpha : 1;

    if (r > 255)
        r = 255;

    if (g > 255)
        g = 255;

    if (b > 255)
        b = 255;

    if (r < 0)
        r = 0;

    if (g < 0)
        g = 0;

    if (b < 0)
        b = 0;

    return { r: r, g: g, b: b, a: a };

}

export const rgbToHex = (color: RGBA): string => {

    const alpha = Math.floor(map(color.a, 0, 1, 0, 255));

    return "0x" + valueToHex(alpha) + valueToHex(color.b) + valueToHex(color.g) + valueToHex(color.r)
}

export const hexToRGBA = (hex: number): RGBA => {

    const hexString: string = hex.toString(16);

    const hexArray = hexString.match(/.{1,2}/g);

    if (!hexArray)
        return {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        }

    const alpha = map(parseInt(hexArray[0], 16), 0, 255, 0, 1);

    return {
        r: parseInt(hexArray[3], 16),
        g: parseInt(hexArray[2], 16),
        b: parseInt(hexArray[1], 16),
        a: alpha
    }
}

export const rgbToRGBA = (rgb: rgb): RGBA => {

    const alpha = (rgb.a) ? rgb.a : 255;

    const color: RGBA = {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: alpha
    }

    return color;

}

export const rgbColorToRGBA = (color: RGBColor): RGBA => {
    return {
        r: color.r,
        g: color.g,
        b: color.b,
        a: (color.a) ? color.a : 1
    }
}

const valueToHex = (value: number) => {
    let hexadecimal = value.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

export const blendColors = (blend: Blend, background: RGBA, foreground: RGBA): RGBA => {

    switch (blend) {
        case Blend.NORMAL: return normal(background, foreground);
        case Blend.COLOR: return color(background, foreground);
        case Blend.COLORBURN: return colorBurn(background, foreground);
        case Blend.COLORDODGE: return colorDodge(background, foreground);
        case Blend.DARKEN: return darken(background, foreground);
        case Blend.LIGHTEN: return lighten(background, foreground);
        case Blend.DIFFERENCE: return difference(background, foreground);
        case Blend.EXCLUSION: return exclusion(background, foreground);
        case Blend.HARDLIGHT: return hardLight(background, foreground);
        case Blend.HUE: return hue(background, foreground);
        case Blend.LUMINOSITY: return luminosity(background, foreground);
        case Blend.SATURATION: return saturation(background, foreground);
        case Blend.SCREEN: return screen(background, foreground);
        case Blend.MULTIPLY: return multiply(background, foreground);
        case Blend.SOFTLIGHT: return softLight(background, foreground);
        case Blend.OVERLAY: return overlay(background, foreground);
    }
}

export const stringToBlend = (blend: string): Blend => {

    switch (blend) {
        case Blend.NORMAL: return Blend.NORMAL;
        case Blend.COLOR: return Blend.COLOR;
        case Blend.COLORBURN: return Blend.COLORBURN;
        case Blend.COLORDODGE: return Blend.COLORDODGE;
        case Blend.DARKEN: return Blend.DARKEN;
        case Blend.LIGHTEN: return Blend.LIGHTEN;
        case Blend.DIFFERENCE: return Blend.DIFFERENCE;
        case Blend.EXCLUSION: return Blend.EXCLUSION;
        case Blend.HARDLIGHT: return Blend.HARDLIGHT;
        case Blend.HUE: return Blend.HUE;
        case Blend.LUMINOSITY: return Blend.LUMINOSITY;
        case Blend.SATURATION: return Blend.SATURATION;
        case Blend.SCREEN: return Blend.SCREEN;
        case Blend.MULTIPLY: return Blend.MULTIPLY;
        case Blend.SOFTLIGHT: return Blend.SOFTLIGHT;
        case Blend.OVERLAY: return Blend.OVERLAY;
        default: return Blend.NORMAL;
    }
}

export const map = (value: number, istart: number, istop: number, ostart: number, ostop: number): number => {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
};

export const lerp = (a: number, b: number, t: number): number => {
    return (1 - t) * a + t * b;
}