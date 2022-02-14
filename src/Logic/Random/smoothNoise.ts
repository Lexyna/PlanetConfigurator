import { interpolate } from "./randomUtils";

export const generateSmoothNoise = (baseNoise: number[][], octave: number) => {

    const width: number = baseNoise.length;
    const height: number = baseNoise[0].length;

    const smoothNoise: number[][] = [];
    for (var i = 0; i < width; i++)
        smoothNoise[i] = [];

    const samplePeriod: number = (1 << octave);
    const sampleFrequency = 1.0 / samplePeriod;

    for (var i = 0; i < width; i++) {
        const sample_i0: number = Math.floor(i / samplePeriod) * samplePeriod;
        const sample_i1: number = (sample_i0 + samplePeriod) % width;
        const horizontalBlend: number = (i - sample_i0) * sampleFrequency;

        for (var j = 0; j < height; j++) {

            const sample_j0: number = Math.floor(j / samplePeriod) * samplePeriod;
            const sample_j1: number = (sample_j0 + samplePeriod) % height;
            const verticalBlend: number = (j - sample_j0) * sampleFrequency;

            const top: number = interpolate(
                baseNoise[sample_i0][sample_j0],
                baseNoise[sample_i1][sample_j0],
                horizontalBlend);

            const bottom: number = interpolate(
                baseNoise[sample_i0][sample_j1],
                baseNoise[sample_i1][sample_j1],
                horizontalBlend);

            smoothNoise[i][j] = interpolate(top, bottom, verticalBlend);
        }
    }
    return smoothNoise;
}