import { nanoid } from "nanoid";
import { ColorMapping } from "../../types/planetProp";
import { State } from "../../types/storeType";

export const planetSelector = (state: State) => state.planet;

export const radiusSelector = (state: State): number => planetSelector(state).radius;

export const seedSelector = (state: State): string => planetSelector(state).seed;

export const colorMappingSelector = (state: State): ColorMapping[] => planetSelector(state).colorMapping;

export const colorMappingIdSelector = (id: string) => (state: State): ColorMapping => {

    let selectedMapping: ColorMapping = initialColorMapping;
    colorMappingSelector(state).forEach((mapping) => {
        if (mapping.id === id) {
            selectedMapping = Object.assign({}, mapping);
        }
    })

    return selectedMapping;
}

const initialColorMapping: ColorMapping = {
    id: nanoid(),
    value: 0,
    color: {
        r: 255,
        g: 0,
        b: 0,
        a: 1
    }
}