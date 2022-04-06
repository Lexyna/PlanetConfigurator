export const solveQuadratic = (a: number, b: number, c: number): [number, number] => {

    const discr = b * b - 4 * a * c;
    if (discr < 0)
        return [NaN, NaN];

    if (discr === 0)
        return [(-0.5 * b / a), (-0.5 * b / a)];

    const q = (b > 0) ?
        -0.5 * (b - Math.sqrt(discr)) :
        -0.5 * (b + Math.sqrt(discr));

    return [(q / a), (c / q)];
}

