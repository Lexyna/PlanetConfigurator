import SimplexNoise from "simplex-noise";
import planet from "../planet/planet";
import { Spheres } from "../utils/Sphere";
import { map } from "../utils/utils";

const simplex1 = new SimplexNoise("1");

export const create3DSimplexNoiseMap = (seed: string, width: number, height: number, depth: number): number[][][] => {

    const texture: number[][][] = [];

    const simplex = new SimplexNoise(seed);

    for (var x = 0; x < width; x++) {
        texture[x] = [];
        for (var y = 0; y < height; y++) {
            texture[x][y] = [];
            for (var z = 0; z < depth; z++)
                texture[x][y][z] = (simplex.noise3D(x / 8, y / 8, z / 32) + 1) / 2;
        }
    }

    return texture;
}

export const createLooping3DSimplexNoiseMap = (seed: string, width: number, height: number, depth: number): number[][][] => {

    const texture: number[][][] = [];

    const simplex = new SimplexNoise(seed);

    for (var x = 0; x < width; x++) {
        texture[x] = [];
        for (var y = 0; y < height; y++) {
            texture[x][y] = [];
            for (var z = 0; z < depth; z++) {

                const angle = map(z, 0, depth, 0, 2 * Math.PI);
                const uoff = map(Math.sin(angle), -1, 1, 0, 2);
                const voff = map(Math.sin(angle), -1, 1, 0, 2);

                texture[x][y][z] = (simplex.noise4D(x / 8, y / 8, uoff, voff / 32) + 1) / 2;

            }
        }
    }

    return texture;
}

export const create3DPlanetMap = (seed: string, width: number, height: number, depth: number): number[][][] => {

    const texture: number[][][] = [];

    const simplex = new SimplexNoise(seed);
    const radius = planet.radius;

    for (let x = 0; x < width; x++) {
        texture[x] = [];
        for (let y = 0; y < radius * 2 + 1; y++)
            texture[x][y] = [];
    }
    const sphere = Spheres.getSphere(radius);

    for (let z = 0; z < depth; z++) {
        for (let x = -radius; x < radius + 0; x++)
            for (let y = -radius; y < radius + 0; y++) {
                const sphereVector = sphere.getSphereCoordinate(x, y, z);
                if (!sphereVector || isNaN(sphereVector.x))
                    continue;

                const noiseVal = (simplex.noise3D(sphereVector.x / 16, sphereVector.y / 16, sphereVector.z / 32) +
                    0.5 * simplex1.noise3D(sphereVector.x / 8, sphereVector.y / 8, sphereVector.z / 32) + 1) / 2;
                let val = noiseVal / (1.5);

                val = Math.pow(val * 1.15, 0.9);

                if (isNaN(val)) {
                    val = 0;
                }

                texture[z][x + radius][y + radius] = val
            }
    }
    return texture;
}