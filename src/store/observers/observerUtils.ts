import { ColorMapping } from "../../types/planetProp";

export const compareColorMappings = (prev: ColorMapping[], curr: ColorMapping[]) => {

    let update = true;

    if (prev.length !== curr.length)
        update = false;

    curr.forEach((mapping, index) => {
        if (mapping.value === curr[index].value)
            update = false;

        if (mapping.color.r === curr[index].color.r)
            update = false;

        if (mapping.color.g === curr[index].color.g)
            update = false;

        if (mapping.color.b === curr[index].color.b)
            update = false;

        if (mapping.color.a === curr[index].color.a)
            update = false;
    })
    return update;
}