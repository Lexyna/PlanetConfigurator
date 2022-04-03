export class Vector2 {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

}

export class Vector3 {

    public x: number;
    public y: number;
    public z: number

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public dot(v: Vector3): number {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public normalize() {
        this.x = this.x / this.length();
        this.y = this.y / this.length();
        this.z = this.z / this.length();
    }
}

export const multiplyScalar = (v: Vector3, s: number) => {
    return new Vector3(
        v.x * s,
        v.y * s,
        v.z * s
    );
}

export const addScalar = (v: Vector3, s: number) => {
    return new Vector3(
        v.x + s,
        v.y + s,
        v.z + s
    )
}

export const addVec3 = (v1: Vector3, v2: Vector3): Vector3 => {
    return new Vector3(
        v1.x + v2.x,
        v1.y + v2.y,
        v1.z + v2.z
    );
}

export const subVec3 = (v1: Vector3, v2: Vector3): Vector3 => {
    return new Vector3(
        v1.x - v2.x,
        v1.y - v2.y,
        v1.z - v2.z
    );
}

export const mulVec3 = (v1: Vector3, v2: Vector3): Vector3 => {
    return new Vector3(
        v1.x * v2.x,
        v1.y * v2.y,
        v1.z * v2.z
    )
}

export const crossProduct = (v1: Vector3, v2: Vector3): Vector3 => {
    return new Vector3(
        v1.y * v2.z - v1.z * v2.y,
        v1.z * v2.x - v1.x * v2.z,
        v1.x * v2.y - v1.y * v2.x
    );
}


