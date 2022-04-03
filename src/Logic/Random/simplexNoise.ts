import SimplexNoise from "simplex-noise";
import { solveQuadratic } from "../Math/utils";
import { addVec3, crossProduct, multiplyScalar, mulVec3, subVec3, Vector3 } from "../Math/vectorUtils";
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

export const createDoubleLooping3DSimplexNoiseMap = (seed: string, width: number, height: number, depth: number): number[][][] => {

    const texture: number[][][] = [];

    const simplex = new SimplexNoise(seed);
    const radius = 64;
    console.log("here")

    for (let x = 0; x < width; x++) {
        texture[x] = [];
        for (let y = 0; y < height; y++)
            texture[x][y] = [];
    }

    //Constant "origin position"
    const origin: Vector3 = new Vector3(0, 0, -100);//-65
    const center: Vector3 = new Vector3(0, 0, 0);

    for (let x = -radius; x < radius + 0; x++)
        for (let y = -radius; y < radius + 0; y++)
            for (let z = 0; z < depth; z++) {

                const angle = map(z, 0, depth, 0, 2 * Math.PI);

                //calculate Sphere based on line-sphere-intersection
                //https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection
                let t0: number, t1: number;

                const rotOrigin: Vector3 = origin;

                //z = fov
                const direction: Vector3 = new Vector3(x, y, 40);

                const L: Vector3 = subVec3(rotOrigin, center);

                const a: number = direction.dot(direction);
                const b: number = 2 * direction.dot(L);
                const c: number = L.dot(L) - (radius * radius);

                [t0, t1] = solveQuadratic(a, b, c);

                if (isNaN(t0)) {
                    continue;
                }

                if (t0 > t1) {
                    const temp = t0;
                    t0 = t1;
                    t1 = temp;
                }

                if (t0 < 0) {
                    t0 = t1;
                }

                if (t0 < 0) {
                    texture[x + radius][y + radius][z] = 0;
                    continue;
                }

                //use t0 to calculate 
                const hit: Vector3 = addVec3(rotOrigin, multiplyScalar(direction, t0));

                const unitVec: Vector3 = new Vector3(0, -1, 0);

                //Rodrigues' rotation formula
                const vRot: Vector3 = addVec3(
                    addVec3(multiplyScalar(hit, Math.cos(angle)), multiplyScalar(crossProduct(unitVec, hit), Math.sin(angle))),
                    multiplyScalar(mulVec3(unitVec, mulVec3(unitVec, hit)), (1 - Math.cos(angle)))
                );

                vRot.x = Number(vRot.x.toFixed(10));
                vRot.z = Number(vRot.z.toFixed(10));

                const noiseVal = (simplex.noise3D(vRot.x / 32, vRot.y / 32, vRot.z / 32) +
                    0.5 * simplex1.noise3D(vRot.x / 16, vRot.y / 16, vRot.z / 32) + 1) / 2;

                let val = noiseVal / (1.5);

                val = Math.pow(val * 1.15, 0.9);

                if (isNaN(val)) {
                    val = 0;
                }

                texture[x + radius][y + radius][z] = val

            }
    return texture;
}