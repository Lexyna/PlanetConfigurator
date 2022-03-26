import { Dispatch } from "react";
import { CloudProps } from "../../types/cloudProp";
import { cloudActionType } from "../action-types/cloudActionTypes";
import { AddCloudAction, RemoveCloudAction, UpdateCloudAction } from "../actions/cloudActions";

export const addCloud = (cloud: CloudProps) => {
    return (dispatch: Dispatch<AddCloudAction>) => {
        dispatch({
            type: cloudActionType.ADD_CLOUD,
            payload: cloud
        })
    }
}

export const updateCloud = (cloud: CloudProps) => {
    return (dispatch: Dispatch<UpdateCloudAction>) => {
        dispatch({
            type: cloudActionType.UPDATE_CLOUD,
            payload: cloud
        })
    }
}

export const removeCloud = (id: string) => {
    return (dispatch: Dispatch<RemoveCloudAction>) => {
        dispatch({
            type: cloudActionType.REMOVE_CLOUD,
            payload: id
        })
    }
}