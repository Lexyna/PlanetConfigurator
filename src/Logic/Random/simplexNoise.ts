import SimplexNoise from "simplex-noise";

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