import { CircleDictionary } from "../../types/circleDictionary";
import { point2d } from "../other/Point";
import { circleGenerator } from "./utils";

export class Circles {

    static instance: Circles;

    static circles: CircleDictionary = {};

    public static createCircles(): void {
        if (Circles.instance)
            return
        Circles.instance = new Circles();
    }

    public static getCircle(radius: number): point2d[] {
        if (radius < 4)
            return [];

        if (Circles.circles[radius])
            return Circles.circles[radius];
        return this.calculateCircle(radius);
    }

    private static calculateCircle(radius: number): point2d[] {

        const points = circleGenerator(radius);
        if (points.length > 0)
            Circles.circles[radius] = points;

        return points;
    }

}