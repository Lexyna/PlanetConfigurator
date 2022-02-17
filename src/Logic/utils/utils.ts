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

const valueToHex = (value: number) => {
    let hexadecimal = value.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}