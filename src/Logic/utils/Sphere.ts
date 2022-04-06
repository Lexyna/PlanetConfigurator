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

    public static initSpheres() {
        for (let i = 4; i <= 65; i++)
            spheres[i] = new Sphere(i);
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
        this.coordinates = sphereGenerator(this.radius, 256);
    }

    public getSphereCoordinate = (x: number, y: number, z: number): Vector3 => {
        return this.coordinates[x + "," + y + "," + z];
    }

}

//function to returns [fov, zOffset] for radius that look good, based on testing
export const getSphereParameters = (radius: number): [number, number] => {

    switch (radius) {
        case 4: return [8, -10];
        case 5: return [10, -12];
        case 6: return [12, -14];
        case 7: return [14, -16];
        case 8: return [16, -16];
        case 9: return [18, -22];
        case 10: return [20, -26];
        case 11: return [22, -26];
        case 12: return [24, -28];
        case 13: return [26, -30];
        case 14: return [28, -35];
        case 15: return [30, -39];
        case 16: return [32, -44];
        case 17: return [45, -49];
        case 18: return [45, -53];
        case 19: return [50, -56];
        case 20: return [55, -60];
        case 21: return [57, -61];
        case 22: return [60, -61];
        case 23: return [61, -66];
        case 24: return [61, -67];
        case 25: return [61, -68];
        case 26: return [61, -70];
        case 27: return [64, -71];
        case 28: return [65, -72];
        case 29: return [65, -72];
        case 30: return [68, -75];
        case 31: return [68, -76];
        case 32: return [68, -76];
        case 33: return [68, -77];
        case 34: return [68, -79];
        case 35: return [68, -80];
        case 36: return [69, -81];
        case 37: return [69, -81];
        case 38: return [69, -81];
        case 39: return [69, -81];
        case 40: return [69, -81];
        case 41: return [69, -81];
        case 42: return [70, -83];
        case 43: return [70, -85];
        case 44: return [71, -89];
        case 45: return [71, -91];
        case 46: return [72, -93];
        case 47: return [72, -95];
        case 48: return [75, -95];
        case 49: return [76, -98];
        case 50: return [85, -95];
        case 51: return [85, -96];
        case 52: return [86, -102];
        case 53: return [88, -104];
        case 54: return [88, -104];
        case 55: return [90, -106];
        case 56: return [90, -108];
        case 57: return [90, -108];
        case 58: return [90, -108];
        case 59: return [90, -108];
        case 60: return [91, -110];
        case 61: return [91, -110];
        case 62: return [93, -114];
        case 63: return [93, -115];
        case 64: return [95, -119];
        default: return [2 * radius, -2 * radius];
    }

}