import { nanoid } from "nanoid";
import { cerateRGBColor } from "../../Logic/utils/utils";
import { CloudProps } from "../../types/cloudProp";
import { State } from "../../types/storeType";

export const cloudsSelector = (state: State) => state.cloudSettings.clouds;

export const cloudSelector = (id: string) => (state: State): CloudProps => {

    let selectedCloud: CloudProps = initialCloud;
    cloudsSelector(state).forEach(cloud => {
        if (cloud.id === id)
            selectedCloud = Object.assign({}, cloud);
    })

    return selectedCloud;
}

const initialCloud: CloudProps = {
    //texture: [[[]]],
    color: cerateRGBColor(255, 255, 255, 255),
    id: nanoid(),
    seed: nanoid(),
    depth: 0,
    maskRadius: 0,
    startFrame: 0,
    transition: false,
    static: false,
    transitionFrames: 0,
    pixelPositionX: 0,
    pixelPositionY: 0
}