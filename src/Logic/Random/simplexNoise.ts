import SimplexNoise from "simplex-noise";
import { rotateVec3OnAxis, Vector3 } from "../Math/vectorUtils";
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
    const radius = 10;
    //r, fov, z
    //64, 100, -100
    //all, 99, -99 

    for (let x = 0; x < width; x++) {
        texture[x] = [];
        for (let y = 0; y < radius * 2 + 1; y++)
            texture[x][y] = [];
    }

    //Constant "origin position"
    //Try different fov// 100 is good //80
    const fov = 100;
    const origin: Vector3 = new Vector3(0, 0, -100);//-65
    const center: Vector3 = new Vector3(0, 0, 0);

    const sphere = Spheres.getSphere(radius);
    console.log("here")

    for (let x = -radius; x < radius + 0; x++)
        for (let y = -radius; y < radius + 0; y++) {

            const unitVec: Vector3 = new Vector3(0, 1, 0);
            const sphereVector = sphere.getSphereCoordinate(x, y);

            if (!sphereVector || isNaN(sphereVector.x))
                continue;

            for (let z = 0; z < depth; z++) {

                const angle = map(z, 0, depth, 0, 2 * Math.PI);

                //calculate Sphere based on line-sphere-intersection
                //https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection
                /*let t0: number, t1: number;

                const rotOrigin: Vector3 = origin;

                //z = fov
                const direction: Vector3 = new Vector3(x, y, fov);

                const L: Vector3 = subVec3(rotOrigin, center);

                const a: number = direction.dot(direction);
                const b: number = 2 * direction.dot(L);
                const c: number = L.dot(L) - (radius * radius);

                [t0, t1] = solveQuadratic(a, b, c);

                if (isNaN(t0)) {
                    continue;
                }

                //use t0 to calculate 
                const hit: Vector3 = addVec3(rotOrigin, multiplyScalar(direction, t0));*/

                let vRot = rotateVec3OnAxis(sphereVector, unitVec, angle);

                //let computed;
                //if (x == 45 && y == -37) {
                //computed = sphereTest?.getSphereCoordinate(x, y);
                //}

                vRot.x = Number(vRot.x.toFixed(10));
                vRot.z = Number(vRot.z.toFixed(10));

                const noiseVal = (simplex.noise3D(vRot.x / 8, vRot.y / 8, vRot.z / 32) +
                    0.5 * simplex1.noise3D(vRot.x / 4, vRot.y / 4, vRot.z / 32) + 1) / 2;

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