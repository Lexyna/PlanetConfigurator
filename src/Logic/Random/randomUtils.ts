export const interpolate = (x0: number, x1: number, alpha: number) => {
    return (x0 * (1 - alpha) + alpha * x1);
}

export const randomRange = (min: number, max: number) => {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}