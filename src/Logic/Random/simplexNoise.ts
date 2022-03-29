import SimplexNoise from "simplex-noise";
import { text } from "stream/consumers";
import { map } from "../utils/utils";

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
                const uoff = map(Math.cos(angle), -1, 1, 0, 2);
                const voff = map(Math.sign(angle), -1, 1, 0, 2);

                texture[x][y][z] = (simplex.noise4D(x / 8, y / 8, uoff, voff / 32) + 1) / 2;

            }
        }
    }

    return texture;
}