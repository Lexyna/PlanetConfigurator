import { IoBagCheckOutline } from "react-icons/io5";
import { ColorSetting } from "../../components/SettingTemplate/ColorSettings";
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

export const cerateRGBColor = (r: number, g: number, b: number, alpha?: number): rgb => {

    if (alpha)
        if (alpha > 255)
            alpha = 255;
        else if (alpha < 0)
            alpha = 0;

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

    return { r: r, g: g, b: b, a: alpha };

}

export const rgbToHex = (color: rgb): string => {
    if (!color.a)
        return "0x" + valueToHex(color.b) + valueToHex(color.g) + valueToHex(color.r)
    else
        return "0x" + valueToHex(color.a) + valueToHex(color.b) + valueToHex(color.g) + valueToHex(color.r)
}

export const hexToRgb = (hex: string): rgb => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return {
        r: r,
        g: g,
        b: b,
        a: 255
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
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}