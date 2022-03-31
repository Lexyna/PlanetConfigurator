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

export const minorCloudsChange = (curr: CloudProps[], prev: CloudProps[]) => {
    let update = true;

    if (prev.length !== curr.length)
        return false;

    curr.forEach((cloud, index) => {

        if (cloud.startFrame !== prev[index].startFrame)
            update = false;

        if (cloud.pixelPositionX !== prev[index].pixelPositionX)
            update = false;

        if (cloud.pixelPositionY !== prev[index].pixelPositionY)
            update = false;

        if (cloud.speed !== prev[index].speed)
            update = false;

        if (cloud.startFrame !== prev[index].startFrame)
            update = false;

        if (cloud.static !== prev[index].static)
            update = false;

        if (cloud.transition !== prev[index].transition)
            update = false;

        if (cloud.usePreciseValues !== prev[index].usePreciseValues)
            update = false;

        if (cloud.transitionFrames !== prev[index].transitionFrames)
            update = false;

        if (cloud.maxAlpha !== prev[index].maxAlpha)
            update = false;

        if (cloud.color.r !== prev[index].color.r)
            update = false;

        if (cloud.color.g !== prev[index].color.g)
            update = false;

        if (cloud.color.b !== prev[index].color.b)
            update = false;

        if (cloud.color.a !== prev[index].color.a)
            update = false;

        if (cloud.blend !== prev[index].blend)
            update = false;

    })

    return update;
}

export const majorCloudsChange = (curr: CloudProps[], prev: CloudProps[]) => {
    let update = true;

    //ignore insertion/deletion
    if (prev.length !== curr.length)
        return true;

    curr.forEach((cloud, index) => {

        if (cloud.depth !== prev[index].depth)
            update = false;

        if (cloud.maskRadius !== prev[index].maskRadius)
            update = false;

        if (cloud.seed !== prev[index].seed)
            update = false;

        if (cloud.looping !== prev[index].looping)
            update = false;

    })

    return update;
}