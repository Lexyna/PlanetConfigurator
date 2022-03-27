import { CloudProps } from "../../types/cloudProp";
import { ColorMapping } from "../../types/planetProp";

export const compareColorMappings = (curr: ColorMapping[], prev: ColorMapping[]) => {

    let update = true;

    if (prev.length !== curr.length)
        return false;

    curr.forEach((mapping, index) => {
        if (mapping.value !== prev[index].value)
            update = false;

        if (mapping.color.r !== prev[index].color.r)
            update = false;

        if (mapping.color.g !== prev[index].color.g)
            update = false;

        if (mapping.color.b !== prev[index].color.b)
            update = false;

        if (mapping.color.a !== prev[index].color.a)
            update = false;
    })
    return update;
}

export const compareClouds = (curr: CloudProps[], prev: CloudProps[]) => {
    let update = true;

    if (prev.length !== curr.length)
        return false;

    curr.forEach((cloud, index) => {

        if (cloud.startFrame !== prev[index].startFrame)
            update = false;

        if (cloud.depth !== prev[index].depth)
            update = false;

        if (cloud.width !== prev[index].width)
            update = false;

        if (cloud.height !== prev[index].height)
            update = false;

        if (cloud.positionX !== prev[index].positionX)
            update = false;

        if (cloud.positionY !== prev[index].positionY)
            update = false;

        if (cloud.seed !== prev[index].seed)
            update = false;

        if (cloud.startFrame !== prev[index].startFrame)
            update = false;

        if (cloud.transition !== prev[index].transition)
            update = false;

        if (cloud.color.r !== prev[index].color.r)
            update = false;

        if (cloud.color.g !== prev[index].color.g)
            update = false;

        if (cloud.color.b !== prev[index].color.b)
            update = false;

        if (cloud.color.a !== prev[index].color.a)
            update = false;

    })

    return update;
}