import { color, colorBurn, colorDodge, darken, difference, exclusion, hardLight, hue, lighten, luminosity, multiply, normal, overlay, saturation, screen, softLight } from "color-blend";
import { RGBA } from "color-blend/dist/types";
import { RGBColor } from "react-color";
import { Blend } from "../../types/cloudProp";
import { rgb } from "../../types/planetTemplate";
import { point2d } from "../other/Point";

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

export const hexToRgb = (hex: string): RGBA => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return {
        r: r,
        g: g,
        b: b,
        a: 1
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

export const addRGBColors = (back: rgb, front: rgb): rgb => {

    const color: rgb = { r: 0, g: 0, b: 0, a: 0 };

    if (!back.a || !front.a)
        return color;

    back.r /= 255;
    back.g /= 255;
    back.b /= 255;
    back.a /= 255;

    front.r /= 255;
    front.g /= 255;
    front.b /= 255;
    front.a /= 255;

    color.a = 1 - (1 - front.a) * (1 - back.a);

    if (color.a < 1.0e-6)
        return color;

    color.r = front.r * front.a / color.a + back.r * back.a * (1 - front.a) / color.a;
    color.g = front.g * front.a / color.a + back.g * back.a * (1 - front.a) / color.a;
    color.b = front.b * front.a / color.a + back.b * back.a * (1 - front.a) / color.a;

    color.r = Math.floor(color.r * 255);
    color.g = Math.floor(color.g * 255);
    color.b = Math.floor(color.b * 255);
    color.a = Math.floor(color.a * 255);

    return color;
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