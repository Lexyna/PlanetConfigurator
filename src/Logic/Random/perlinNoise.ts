import { generateSmoothNoise } from "./smoothNoise";

export const generatePerlinNoise = (baseNoise: number[][], octaves: number) => {

    const width: number = baseNoise.length;
    const height: number = baseNoise[0].length;

    const smoothNoise: number[][][] = [];

    const persistance: number = 0.5;

    for (var i = 0; i < octaves; i++)
        smoothNoise[i] = generateSmoothNoise(baseNoise, i);

    const perlinNoise: number[][] = [];
    for (var i = 0; i < width; i++)
        perlinNoise[i] = [];

    for (var i = 0; i < width; i++)
        for (var j = 0; j < height; j++)
            perlinNoise[i][j] = 0;

    let amplitude: number = 1.0;
    let totalAmplitude: number = 0.0;

    for (var octave = octaves - 1; octave >= 0; octave--) {

        amplitude *= persistance;
        totalAmplitude += amplitude;

        for (var i = 0; i < width; i++)
            for (var j = 0; j < height; j++)
                perlinNoise[i][j] += smoothNoise[octave][i][j] * amplitude;
    }

    for (var i = 0; i < width; i++)
        for (var j = 0; j < height; j++)
            perlinNoise[i][j] /= totalAmplitude;

    return perlinNoise;
}