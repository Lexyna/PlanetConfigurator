import { nanoid } from "nanoid";
import { cerateRGBColor } from "../../Logic/utils/utils";
import { CloudProps, CloudsProps } from "../../types/cloudProp";
import { cloudActionType } from "../action-types/cloudActionTypes";
import { addCloud, removeCloud, updateClouds } from "./functions/cloudReducerFunctions";
import reducerFactory, { IHandler } from "./reducerFactory";

const initialState: CloudsProps = {
    clouds: []
}

const handlers: IHandler = {};
handlers[cloudActionType.ADD_CLOUD] = addCloud;
handlers[cloudActionType.UPDATE_CLOUD] = updateClouds;
handlers[cloudActionType.REMOVE_CLOUD] = removeCloud;

const cloudReducer = reducerFactory(initialState, handlers);

export default cloudReducer;