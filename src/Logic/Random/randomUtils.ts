export const interpolate = (x0: number, x1: number, alpha: number) => {
    return (x0 * (1 - alpha) + alpha * x1);
}