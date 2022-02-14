import { mulberry32, xmur3 } from "./seedUtils";

export const generateWhiteNoiseWithSeed = (seedString: string, width: number, height: number) => {

    const noise: number[][] = [];
    for (var i = 0; i < width; i++)
        noise[i] = [];

    const seed = xmur3(seedString);
    const rand: () => number = mulberry32(seed());

    for (var i = 0; i < width; i++)
        for (var j = 0; j < height; j++)
            noise[i][j] = rand();
    return noise;
}