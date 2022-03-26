import SimplexNoise from "simplex-noise";

export const create3DSimplexNoiseMap = (seed: string, width: number, height: number, depth: number): number[][][] => {

    const texture: number[][][] = [];

    const simplex = new SimplexNoise(seed);

    for (var i = 0; i < width; i++) {
        texture[i] = [];
        for (var j = 0; j < height; j++) {
            texture[i][j] = [];
            for (var z = 0; z < depth; z++)
                texture[i][j][z] = simplex.noise3D(i, j, z);
        }
    }

    return texture;
}