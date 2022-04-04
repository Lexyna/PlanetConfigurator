import { SphereDictionary } from "../../types/sphereDictionary";
import { Vector3 } from "../Math/vectorUtils";
import { pointToSphereCoordinate } from "../other/Point";
import { sphereGenerator } from "./utils";

export const spheres: SphereDictionary = {};

export class Spheres {

    static instance: Spheres;

    static spheres: SphereDictionary = {};

    public static createSphere(): void {
        if (Spheres.instance)
            return;
        Spheres.instance = new Spheres();
    }

    public static getSphere(radius: number): Sphere {
        if (radius < 4)
            return new Sphere(0);

        if (spheres[radius])
            return spheres[radius];

        spheres[radius] = new Sphere(radius);
        return spheres[radius];
    }

}

export class Sphere {

    public radius: number;

    private coordinates: pointToSphereCoordinate;

    constructor(radius: number) {
        this.radius = radius;
        this.coordinates = sphereGenerator(this.radius);
    }

    public getSphereCoordinate = (x: number, y: number): Vector3 => {
        return this.coordinates[x + "," + y];
    }

}