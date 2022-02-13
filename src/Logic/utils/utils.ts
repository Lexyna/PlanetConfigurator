import { point2d } from "../other/Point";

export const circleGenerator = (radius: number): point2d[] => {

    if (radius > 64)
        return [];

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
            if (!circle.some((p: point2d) => p === point))
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