import { CloudProps } from "../../types/cloudProp";
import { cloudActionType } from "../action-types/cloudActionTypes";

export interface AddCloudAction {
    type: cloudActionType.ADD_CLOUD,
    payload: CloudProps
}

export interface RemoveCloudAction {
    type: cloudActionType.REMOVE_CLOUD,
    payload: string
}

export interface UpdateCloudAction {
    type: cloudActionType.UPDATE_CLOUD,
    payload: CloudProps
}