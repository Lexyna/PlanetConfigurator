import { CloudProps, CloudsProps } from "../../../types/cloudProp";
import { AddCloudAction, RemoveCloudAction, UpdateCloudAction } from "../../actions/cloudActions";

export const addCloud = (state: CloudsProps, action: AddCloudAction): CloudsProps => {
    return {
        clouds: state.clouds.concat(action.payload)
    }
}

export const removeCloud = (state: CloudsProps, action: RemoveCloudAction): CloudsProps => {
    const newClouds = state.clouds.slice(0);
    newClouds.forEach((cloud, index) => {
        if (cloud.id === action.payload)
            newClouds.splice(index, 1);
    })

    return {
        clouds: newClouds
    }
}

export const updateClouds = (state: CloudsProps, action: UpdateCloudAction): CloudsProps => {
    const newClouds = state.clouds.slice(0);
    newClouds.forEach((cloud, index) => {
        if (cloud.id === action.payload.id)
            newClouds[index] = action.payload;
    })

    return {
        clouds: newClouds
    }
}